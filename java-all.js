import com.amazonaws.auth.policy.Policy;
import com.amazonaws.auth.policy.Statement;
import com.amazonaws.auth.policy.actions.S3Actions;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.RunInstancesRequest;
import com.amazonaws.services.ec2.model.RunInstancesResult;
import com.amazonaws.services.iam.AmazonIdentityManagement;
import com.amazonaws.services.iam.AmazonIdentityManagementClientBuilder;
import com.amazonaws.services.iam.model.CreatePolicyRequest;
import com.amazonaws.services.iam.model.CreatePolicyResult;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.BucketPolicy;
import com.amazonaws.services.s3.model.SetBucketPolicyRequest;

public class AwsDemo {
    public static void main(String[] args) {
        // IAM: Create an overexcessive policy
        AmazonIdentityManagement iam = AmazonIdentityManagementClientBuilder.standard().build();
        CreatePolicyRequest createPolicyRequest = new CreatePolicyRequest()
                .withPolicyName("OverexcessivePolicy")
                .withPolicyDocument("{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}]}");
        CreatePolicyResult policyResult = iam.createPolicy(createPolicyRequest);

        // S3: Create an S3 bucket with public access
        AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
        Bucket bucket = s3.createBucket("overexcessive-bucket");
        BucketPolicy bucketPolicy = new BucketPolicy()
                .withStatements(new Statement(Statement.Effect.Allow)
                        .withActions(S3Actions.GetObject)
                        .withPrincipals(Statement.AWSPrincipal.ALL_USERS)
                        .withResources(new com.amazonaws.auth.policy.Resource(bucket.getName() + "/*")));
        s3.setBucketPolicy(new SetBucketPolicyRequest(bucket.getName(), bucketPolicy.toJson()));

        // EC2: Launch an instance with an open security group
        AmazonEC2 ec2 = AmazonEC2ClientBuilder.standard().build();
        RunInstancesRequest runInstancesRequest = new RunInstancesRequest()
                .withImageId("ami-0c55b159cbfafe1f0")
                .withMinCount(1)
                .withMaxCount(1)
                .withSecurityGroups("overexcessive-security-group");
        RunInstancesResult runInstancesResult = ec2.runInstances(runInstancesRequest);
    }
}
