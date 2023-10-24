extern "C" {
#include <aws/core/Aws.h>
#include <aws/iam/IAMClient.h>
#include <aws/s3/S3Client.h>
#include <aws/ec2/EC2Client.h>
#include <aws/sqs/SQSClient.h>
#include <aws/sns/SNSClient.h>
}

int main() {
    Aws::SDKOptions options;
    Aws::InitAPI(options);

    // IAM: Create an overexcessive policy
    Aws::IAM::IAMClient iamClient;
    // Code to create an IAM policy with overexcessive permissions goes here

    // S3: Create an S3 bucket with public access
    Aws::S3::S3Client s3Client;
    // Code to create an S3 bucket with public access goes here

    // EC2: Launch an instance with an open security group
    Aws::EC2::EC2Client ec2Client;
    // Code to launch an EC2 instance with an open security group goes here

    // SQS: Create an SQS queue with overly permissive permissions
    Aws::SQS::SQSClient sqsClient;
    // Code to create an SQS queue with overly permissive permissions goes here

    // SNS: Create an SNS topic with overly permissive permissions
    Aws::SNS::SNSClient snsClient;
    // Code to create an SNS topic with overly permissive permissions goes here

    Aws::ShutdownAPI(options);
    return 0;
}
