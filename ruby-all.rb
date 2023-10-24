require 'aws-sdk-iam'
require 'aws-sdk-s3'
require 'aws-sdk-ec2'
require 'aws-sdk-sqs'
require 'aws-sdk-sns'

# IAM: Create an overexcessive policy
iam = Aws::IAM::Client.new
policy_document = {
  "Version" => "2012-10-17",
  "Statement" => [
    {
      "Effect" => "Allow",
      "Action" => "*",
      "Resource" => "*"
    }
  ]
}.to_json

iam.create_policy({
  policy_name: 'OverexcessivePolicy',
  policy_document: policy_document
})

# S3: Create an S3 bucket with public access
s3 = Aws::S3::Client.new
s3.create_bucket({
  bucket: 'overexcessive-bucket'
})

s3.put_bucket_policy({
  bucket: 'overexcessive-bucket',
  policy: '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::overexcessive-bucket/*"
      }
    ]
  }'
})

# EC2: Launch an instance with an open security group
ec2 = Aws::EC2::Resource.new
instance = ec2.create_instances({
  image_id: 'ami-0c55b159cbfafe1f0',
  min_count: 1,
  max_count: 1,
  security_groups: ['overexcessive-security-group']
})

# SQS: Create an SQS queue with overly permissive permissions
sqs = Aws::SQS::Client.new
queue_url = sqs.create_queue({
  queue_name: 'overexcessive-queue'
}).queue_url

sqs.set_queue_attributes({
  queue_url: queue_url,
  attributes: {
    'Policy' => '{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "sqs:*",
          "Resource": "' + queue_url + '"
        }
      ]
    }'
  }
})

# SNS: Create an SNS topic with overly permissive permissions
sns = Aws::SNS::Client.new
topic_arn = sns.create_topic({
  name: 'overexcessive-topic'
}).topic_arn

sns.set_topic_attributes({
  topic_arn: topic_arn,
  attribute_name: 'Policy',
  attribute_value: '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "sns:*",
        "Resource": "' + topic_arn + '"
      }
    ]
  }'
})
