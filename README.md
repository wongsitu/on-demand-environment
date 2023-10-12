# On demand envitonments

Ever wondered how vercel creates on demand staging evnironments on every branch? We are going to replicate that in this project.

### Overview



### Steps

1. First we must create a cloudformation template. The template will accept 3 arguments the bucket name, envPrefix and github username.This is because we want to create the enviroment with the following name: `http://<branch-name>.<github.username>.com.s3-website-us-east-1.amazonaws.com`. In this template we are also specifying 2 logical resources: The AWS S# bucket itself and a S3 Bucket Access Policy.

```yaml
Parameters:
   # We pass the paramters
   BucketName: 
      Type: String 
      Description: Enter Bucket Name
   EnvPrefix:
      Type: String
   Username:
      Type: String
Resources:
   # We create a bucket
   MyBucket:
      Type: AWS::S3::Bucket
      Properties: 
         BucketName: !Ref BucketName
         WebsiteConfiguration: 
         IndexDocument: index.html
         PublicAccessBlockConfiguration:
         BlockPublicAcls: false
         BlockPublicPolicy: false
         IgnorePublicAcls: false
         RestrictPublicBuckets: false
   # We create a bucket policy
   MyBucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
         Bucket: !Ref MyBucket
         PolicyDocument:
         Version: 2012-10-17
         Statement:
            - Action:
               - 's3:GetObject'
               Effect: Allow
               Principal: '*'
               Resource: !Join
               - ''
               - - 'arn:aws:s3:::'
                  - !Ref EnvPrefix
                  - '.'
                  - !Ref Username
                  - '.com/*'
Outputs:
   WebsiteURL:
      Value: !GetAtt MyBucket.WebsiteURL
      Description: URL for website hosted on S3

```

2. 