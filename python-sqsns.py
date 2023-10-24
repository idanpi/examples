import boto3
import json

# IAM: Create an overexcessive policy
iam = boto3.client('iam')
policy_document = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
iam.create_policy(PolicyName='OverexcessivePolicy', PolicyDocument=json.dumps(policy_document))

# S3: Create an S3 bucket with public access
s3 = boto3.client('s3')
s3.create_bucket(Bucket='overexcessive-bucket')
s3.put_bucket_policy(
    Bucket='overexcessive-bucket',
    Policy='''{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::overexcessive-bucket/*"
            }
        ]
    }'''
)

# EC2: Launch an instance with an open security group
ec2 = boto3.resource('ec2')
instance = ec2.create_instances(
    ImageId='ami-0c55b159cbfafe1f0',
    MinCount=1,
    MaxCount=1,
    SecurityGroups=['overexcessive-security-group']
)

# SQS: Create an SQS queue with overly permissive permissions
sqs = boto3.client('sqs')
queue_url = sqs.create_queue(QueueName='overexcessive-queue')['QueueUrl']
sqs.set_queue_attributes(
    QueueUrl=queue_url,
    Attributes={
        'Policy': json.dumps({
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "sqs:*",
                    "Resource": queue_url
                }
            ]
        })
    }
)

# SNS: Create an SNS topic with overly permissive permissions
sns = boto3.client('sns')
topic_arn = sns.create_topic(Name='overexcessive-topic')['TopicArn']
sns.set_topic_attributes(
    TopicArn=topic_arn,
    AttributeName='Policy',
    AttributeValue=json.dumps({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "sns:*",
                "Resource": topic_arn
            }
        ]
    })
)
