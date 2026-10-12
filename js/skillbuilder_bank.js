/* Banco generado por scripts/extract_skillbuilder.py */
/* Formato: {t: tema/categoría, q: pregunta, o: opciones, a: correcta(s), e: explicación} */
/* Multi-select: 'a' es un array de índices correctos. */
const SKILLBUILDER_BANK = [
  {
    "t": "Data Analytics",
    "q": "Which file systems are supported in an Amazon EMR cluster? (Select THREE.)",
    "o": [
      "HDFS",
      "EMRFS",
      "Local storage",
      "FTP"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What are the types of secret values In AWS Secrets Manager? (Select TWO.)",
    "o": [
      "String",
      "Integer",
      "Binary",
      "Table"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which statement is true, regarding denied topics when implementing Amazon Bedrock Guardrails?",
    "o": [
      "Denied topics can be defined only by using regular expressions.",
      "Denied topics prevent the model from generating responses about specific subjects.",
      "Denied topics apply only to input prompts, not model responses.",
      "Denied topics can be configured only through the AWS Command Line Interface (AWS CLI)."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the purpose of asset synchronization between AWS IoT SiteWise and AWS IoT TwinMaker?",
    "o": [
      "Create a backup of AWS IoT SiteWise assets and asset models in AWS IoT TwinMaker.",
      "Enable real-time data streaming from AWS IoT SiteWise to AWS IoT TwinMaker.",
      "Convert AWS IoT SiteWise assets and asset models into AWS IoT TwinMaker entities, components, and component types.",
      "Enable bi-directional synchronization of asset changes between AWS IoT SiteWise and AWS IoT TwinMaker."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service can add image and video analysis to applications to identify objects, people, text, scenes, and activities?",
    "o": [
      "Amazon Kinesis Video Streams",
      "Amazon Rekognition",
      "Amazon Quick",
      "Amazon Translate"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "An application converts a video file into five different display resolutions so that viewers can watch the video on multiple devices. Which service can orchestrate the parallel processing of a video file?",
    "o": [
      "AWS Fargate",
      "Amazon Simple Queue Service (Amazon SQS)",
      "AWS Step Functions",
      "AWS Lambda"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "An AWS Glue crawler can be run only once a day.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service allows two Linux applications, running in different AZs, to share a common file system?",
    "o": [
      "Amazon Elastic File System (Amazon EFS)",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Simple Storage Service (Amazon S3)"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statement accurately describes the purpose of prompts with large language models (LLMs) in Amazon Bedrock?",
    "o": [
      "Prompts are a specific set of inputs that guide LLMs to generate an appropriate response or output for a given task or instruction.",
      "Prompts are used to configure the hardware specifications of the LLMs.",
      "Prompts are used to train the LLMs on specific datasets.",
      "Prompts are used to monitor the performance of the LLMs."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which device does AWS Glue Studio use to create and schedule jobs?",
    "o": [
      "A graphical interface",
      "A serverless service",
      "A metadata storage object",
      "An event-invoked function"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which functions does Amazon RDS perform on the behalf of users? (Select THREE.)",
    "o": [
      "Provision the infrastructure capacity.",
      "Install the database software.",
      "Automate data backups.",
      "Create database users."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which process converts raw text into a numerical format suited for manipulation and analysis by a large language model (LLM)?",
    "o": [
      "Tokenization",
      "Vectorization",
      "Normalization",
      "Transformation"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the purpose of Amazon Personalize? (Select TWO.)",
    "o": [
      "Build highly available and scalable web applications.",
      "Provide individualized recommendations for customers.",
      "Perform batch processing of large datasets stored in Amazon S3.",
      "Provide real-time personalization and recommendations."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which Amazon Rekognition APIs can be used to detect inappropriate or offensive content? (Select THREE.)",
    "o": [
      "DetectModerationLabels",
      "StartContentModeration",
      "GetContentModeration",
      "LabelDetectionInappropriate"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which statements about Amazon Managed Grafana plugins are correct? (Select THREE.)",
    "o": [
      "Community plugins are provided by AWS and Grafana Labs, and are supported by both organizations.",
      "Enterprise plugins are supported by AWS and Grafana Labs, allowing users to submit issues to either support team.",
      "The AWS Data Sources plugin is provided and supported solely by AWS.",
      "Community plugins not created by AWS or Grafana Labs are typically supported through GitHub issues or other forums."
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "An AWS Glue crawler is capable of ingesting data from only an Amazon S3 source.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service can receive streaming data from Amazon Data Firehose?",
    "o": [
      "AWS DataSync",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Redshift",
      "Amazon DynamoDB"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service can act as a fallback when a user's input to an intent isn't what a chatbot expects?",
    "o": [
      "Amazon SageMaker AI",
      "AWS Lambda",
      "Amazon EC2",
      "Amazon API Gateway"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is the correct term for an Amazon OpenSearch Service cluster?",
    "o": [
      "Zone",
      "Node",
      "Domain",
      "Bucket"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the purpose of a prompt template in LangChain? (Select TWO.)",
    "o": [
      "Specify the formatting of a prompt with exchangeable content.",
      "Provide instructions, examples, and context for a specific use case.",
      "Define the training data for a language model.",
      "Optimize the performance of a language model on a specific task."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which location option can be selected when launching an Amazon EC2 instance in an AWS Region?",
    "o": [
      "Bucket",
      "Availability Zone",
      "Transit gateway",
      "Container"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which AWS service manages the underlying infrastructure when using AWS Fargate?",
    "o": [
      "Amazon EC2",
      "Amazon Elastic Container Service (Amazon ECS)",
      "AWS Lambda",
      "Amazon Elastic Kubernetes Service (Amazon EKS)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How does AWS Network Firewall work within a virtual private cloud (VPC)?",
    "o": [
      "The firewall is directly installed on the VPC.",
      "The firewall operates at the subnet level within a VPC.",
      "The firewall cannot work within a VPC.",
      "The firewall works only on an Amazon EC2 instance level."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is an example of a properly formatted AWS Identity and Access Management (IAM) ARN?",
    "o": [
      "arn:aws:iam::123456789012:user/JohnDoe",
      "aws:arn:iam::123456789012:user/JohnDoe",
      "iam:::123456789012:user/JohnDoe",
      "https://aws.123456789012.user/JohnDoe"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How do users configure an interface virtual private cloud (VPC) endpoint on AWS?",
    "o": [
      "Create a VPC endpoint route table and associate it with the VPC.",
      "Create an endpoint network interface in the VPC and attach it to the desired subnet.",
      "Modify the VPC security group to allow traffic to the desired AWS service.",
      "Create a VPC endpoint policy and attach it to the desired endpoint service."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which examples of a cloud computing model are valid? (Select THREE.)",
    "o": [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Cloud as a Service (CaaS)",
      "Software as a Service (SaaS)"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of the Llama Guard text moderation model?",
    "o": [
      "Provide input and output safeguards in large language model (LLM) deployments.",
      "Secure web applications.",
      "Automate underlying infrastructure provisioning.",
      "Manage serverless functions."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which valid sentiment values can be returned when calling the Amazon Comprehend DetectSentiment API?",
    "o": [
      "Happy, Sad, Indifferent, Angry",
      "Positive, Negative, Neutral, Mixed",
      "-1.0, 0.0, +1.0",
      "True, False"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Kendra can be configured to return a specific type of search response (answer, document, question-answer) to a query.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which use case is suitable for an AWS Step Functions Express workflow?",
    "o": [
      "Coordinate long-running ETL jobs to enrich data for more accurate machine learning models.",
      "Create a high-volume, event-processing IoT data ingestion workload.",
      "Automate the training of a machine learning model, and then require manual approval of the model by a data scientist.",
      "Update an order during checkout, and then reflect the update back to the customer."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which scenarios are ideal use cases for AWS PrivateLink? (Select TWO.)",
    "o": [
      "Establishing secure connectivity between on-premises networks and AWS services",
      "Exposing a service endpoint to partners",
      "Transferring large datasets from on-premises to AWS using AWS Snowball Edge",
      "Creating encrypted tunnels between your network and your VPCs or transit gateways"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "AWS Lambda is a flexible service designed for a wide variety of use cases. Which solutions can be implemented by using AWS Lambda? (Select THREE.)",
    "o": [
      "Web applications",
      "Web and mobile backends",
      "Persistent object storage",
      "Parallelized computing tasks"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which resource acts as a virtual firewall that controls the traffic for one or more instances?",
    "o": [
      "Amazon Virtual Private Cloud (Amazon VPC)",
      "Security groups",
      "Network access control lists (ACLs)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which term defines simple, column-based filtering in AWS Lake Formation?",
    "o": [
      "Include",
      "Exclude",
      "Both",
      "Neither"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which type of virtual private cloud (VPC) endpoint can be used with AWS PrivateLink to access other services from within a VPC?",
    "o": [
      "Gateway endpoint",
      "Hybrid endpoint",
      "Private endpoint",
      "Interface endpoint"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What does the AWS IoT TwinMaker plugin provide for Grafana dashboards? (Select TWO.)",
    "o": [
      "Automatic configuration of CORS settings for Amazon S3 buckets used by the plugin",
      "Custom panels and dashboard templates to visualize digital twin data",
      "Integration with AWS IoT SiteWise for industrial data analytics",
      "A data source to connect to and query digital twin data from AWS IoT TwinMaker"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statements regarding Amazon Simple Queue Service (Amazon SQS) queues are true? (Select THREE.)",
    "o": [
      "Amazon SQS consumers poll the queue for updates.",
      "Amazon SQS pushes change notifications to consumers.",
      "Users can create separate queues for sending and receiving messages.",
      "Amazon SQS requires no administrative overhead."
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "AWS Network Firewall supports only stateful rules groups.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which type of agent must be installed to record software configuration changes on managed instances?",
    "o": [
      "Amazon CloudWatch",
      "AWS Systems Manager",
      "AWS Application Discovery Service",
      "AWS CodeDeploy"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service does Amazon Athena integrate with to create a unified metadata repository across various services?",
    "o": [
      "AWS CodeCommit",
      "Amazon DynamoDB",
      "AWS Lambda",
      "AWS Glue"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Using Amazon DynamoDB, an administrator wants to dynamically record each new invoice total into a separate totals table, and then update a dashboard. Which DynamoDB feature can help aggregate this data?",
    "o": [
      "DynamoDB Global Tables",
      "DynamoDB Secondary Index",
      "DynamoDB Streams",
      "DynamoDB Accelerator"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "In reinforcement learning (RL), the process of finding a strategy that optimizes the cumulative reward is called a policy.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which deployment options does Amazon SageMaker AI provide? (Select THREE.)",
    "o": [
      "Real-time Inference",
      "Batch Transform",
      "Synchronous Inference",
      "Asynchronous Inference"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "AWS Transit Gateway supports routing between virtual private clouds (VPCs) with identical CIDRs.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are the three types of machine learning algorithms? (Select THREE.)",
    "o": [
      "Enforced learning",
      "Reinforcement learning",
      "Supervised learning",
      "Unsupervised learning"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which capabilities does Amazon OpenSearch Service support? (Select THREE.)",
    "o": [
      "Security monitoring",
      "Semantic search",
      "Data visualization",
      "Serverless compute"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What is a main benefit of using Amazon Translate for batch translation?",
    "o": [
      "Instant translation of content",
      "Translating a wide variety of file formats",
      "Integrating translation within customer-facing applications",
      "Providing a free tier for limited usage"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which tasks can be performed in Amazon SageMaker AI Studio? (Select THREE.)",
    "o": [
      "Prepare data for machine learning.",
      "Deploy models.",
      "Schedule notebooks.",
      "Track experiments."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statement regarding AWS Identity and Access Management (IAM) permissions is true?",
    "o": [
      "If a user or group is denied the s3:DeleteObject permission, it only applies to performing the operation using the AWS API. They can still delete objects from the web console.",
      "If a user or group is denied the s3:DeleteObject permission, it applies to all ways that the operation can be performed.",
      "If a user or group is denied the s3:DeleteObject permission, they can generate a new Access/Secret key combo to get around this restriction."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is Amazon DynamoDB? (Select TWO.)",
    "o": [
      "A fast and flexible relational database service.",
      "A fast and flexible non relational database service.",
      "A service that needs a schema defined.",
      "A key-value NoSQL database."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which chips were developed by AWS to be cost-efficient options for machine learning tasks?",
    "o": [
      "OpenLLaMA and RedPajama",
      "AWS Trainium and AWS Inferentia",
      "GPT-J-6B/Neox-20B",
      "Mosiac MPT-7B"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the MOST important consideration when prompting a large language model (LLM) in Amazon Bedrock? (Select TWO.)",
    "o": [
      "Ensuring the prompt is concise and focused on the desired task",
      "Providing detailed background information to the LLM",
      "Crafting the prompt to align with the LLM's capabilities and limitations",
      "Using technical jargon and complex language in the prompt"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which option designates the API calls to allow or deny in an IAM policy?",
    "o": [
      "Principal",
      "Effect",
      "Resource",
      "Action"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which LangChain component can developers use to log, monitor, and stream specific events in LangChain operations?",
    "o": [
      "Agents",
      "Callbacks",
      "Prompt templates",
      "Retrieval modules"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which AWS service provides a fully managed environment for building, training, and deploying machine learning (ML) models, including generative AI?",
    "o": [
      "AWS Lambda",
      "Amazon EC2",
      "Amazon SageMaker AI",
      "Amazon Comprehend"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "There is no charge for inbound data from the internet into AWS.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statements accurately describe Amazon Bedrock? (Select TWO.)",
    "o": [
      "Amazon Bedrock is a service that provides pre-trained LLMs for various tasks.",
      "Developers can use Amazon Bedrock to create and configure autonomous agents for their applications.",
      "Amazon Bedrock is a cloud-based environment to train and deploy custom LLMs.",
      "Amazon Bedrock provides a graphical user interface for interacting with LLM agents."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which method is used to publish data to an Amazon Kinesis video stream?",
    "o": [
      "Upload a video directly to Amazon S3.",
      "Use the upload button on the Kinesis Video Streams console.",
      "Use the latest version of the CDK.",
      "Use the PutMedia API operation."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Managed Service for Apache Flink is a fully managed Amazon service that enables you to use an Apache Flink application to process streaming data.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which AWS service endpoint is used to make inference requests for models hosted in Amazon Bedrock?",
    "o": [
      "bedrock",
      "bedrock-runtime",
      "bedrock-agent",
      "bedrock-agent-runtime"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Virtual private clouds (VPCs) must have different CIDRs to be connected through AWS Transit Gateway.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which statement best describes the deployment options provided by Amazon SageMaker AI to build and train models?",
    "o": [
      "SageMaker supports only real-time inference for all types of workloads.",
      "SageMaker offers real-time inference, batch transform, and asynchronous inference, each suitable for different workload requirements.",
      "Batch transform in SageMaker is primarily used for real-time predictions with large payload sizes.",
      "Asynchronous inference is the only available deployment option in SageMaker, designed for workloads with millisecond latency requirements."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the typical failover time for a Multi-AZ deployment in Amazon RDS?",
    "o": [
      "30–60 seconds",
      "60–120 seconds",
      "120–180 seconds",
      "180–240 seconds"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which capability of AWS Systems Manager can be used to perform on-demand changes, such as updating applications or running Linux shell scripts on a target set of dozens or hundreds of Amazon EC2 instances?",
    "o": [
      "Incident Manager",
      "Parameter Store",
      "OpsCenter",
      "Run Command"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the MOST appropriate use case for AmazonKendraRetriever in LangChain?",
    "o": [
      "Performing batch processing of large datasets stored in Amazon S3",
      "Building a conversational interface for a chatbot using Amazon Lex",
      "Retrieving relevant information from unstructured data sources such as documents, webpages, and FAQs",
      "Translating text between different languages using Amazon Translate"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can reduce costs when using Amazon Simple Queue Service (Amazon SQS) queues? (Select TWO.)",
    "o": [
      "Use batching message actions.",
      "Select the appropriate polling mode.",
      "Use FIFO queues instead of Standard queues.",
      "Send messages that have fewer than 10 attributes."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "When using Amazon Comprehend in a synchronous invocation operation, only one document can be provided for analysis.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the correct meaning of the RCF acronym in machine learning?",
    "o": [
      "Random Capacity Forecasting",
      "Reinforcement Cut Forest",
      "Random Component Forest",
      "Random Cut Forest"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can an AWS Backup plan define? (Select TWO.)",
    "o": [
      "Frequency",
      "Compliance levels",
      "Retention period",
      "Allowed data types"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "How can drift detection be invoked in AWS CloudFormation? (Select TWO.)",
    "o": [
      "It is automatically invoked as part of a CloudFormation stack.",
      "It can be manually invoked through the console, the AWS CLI, or an API call.",
      "It can be invoked by another service, such as an AWS Lambda function.",
      "It cannot be invoked. It only runs if there has been drift."
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is AWS WAF pricing based on? (Select TWO.)",
    "o": [
      "Number of rules deployed",
      "Number of firewalls set up",
      "Number of web access control list (web ACLs) created",
      "Number of web requests an application receives"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which AWS Pricing Calculator path can be used to generate an estimate for the Amazon EC2 instances with an hourly snapshot requirement?",
    "o": [
      "Quick",
      "Express",
      "Detailed",
      "Advanced"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which resource is an Amazon API Gateway feature that uses an AWS Lambda function to control access to an API?",
    "o": [
      "Amazon Cognito authorizer",
      "AWS Lambda authorizer",
      "Policy engine",
      "AWS Lambda integrator"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is true when peering across different Regions in AWS Transit Gateway?",
    "o": [
      "Peering is not possible across Regions in AWS Transit Gateway.",
      "Peering is only possible between transit gateways in the same Region.",
      "Peering is possible across Regions in AWS Transit Gateway by using inter-Region peering.",
      "Peering is only possible between transit gateways that are owned by the same AWS account."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Using Amazon Simple Queue Service (Amazon SQS), a data engineer finds that messages take 10–30 seconds to process in a queue. Messages that fail to process are returned to the queue for redelivery after 5 minutes. What should the data engineer do to retry failed messages faster?",
    "o": [
      "Increase the visibility timeout to 6 minutes.",
      "Reduce the visibility timeout to 10 seconds.",
      "Reduce the visibility timeout to 40 seconds.",
      "Increase the consumer's Amazon EC2 instance type."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can be configured when creating a new Amazon EC2 instance? (Select TWO.)",
    "o": [
      "Instance type",
      "S3 bucket",
      "Database engine",
      "Security group"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS services can access a file system in Amazon Elastic File System (Amazon EFS)? (Select THREE.)",
    "o": [
      "Amazon Relational Database Service (Amazon RDS)",
      "Amazon Elastic Compute Cloud (Amazon EC2)",
      "AWS Lambda",
      "Amazon SageMaker AI"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS services support Amazon VPC endpoints?",
    "o": [
      "All AWS services support VPC endpoints.",
      "Only a subset of AWS services support VPC endpoints.",
      "VPC endpoints are not supported by any AWS services.",
      "VPC endpoints are only supported for VPC peering."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service can create advanced policies to further refine access to APIs behind Amazon API Gateway?",
    "o": [
      "Amazon Macie",
      "AWS Lambda",
      "Amazon API Gateway",
      "AWS Identity and Access Management (IAM)"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the default name and location for the build specification file in AWS CodeBuild?",
    "o": [
      "buildspec.yaml in the config directory",
      "build.yml in the root directory",
      "build.yaml in the config directory",
      "buildspec.yml in the root directory"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which resource is a component of the AWS Glue Data Catalog? (Select THREE.)",
    "o": [
      "Crawlers",
      "Classifiers",
      "The query editor",
      "Databases and tables"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service protects web applications or APIs against common web exploits and bots?",
    "o": [
      "Amazon GuardDuty",
      "AWS Security Hub",
      "AWS WAF",
      "Amazon Macie"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which two groups does Amazon Simple Notification Service (Amazon SNS) send messages between?",
    "o": [
      "Senders and receivers",
      "Publishers and subscribers",
      "Creators and users"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Athena can query data encrypted by AWS Key Management Service (AWS KMS).",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the meaning of the LLM acronym in generative artificial intelligence?",
    "o": [
      "Long lived memory",
      "Large language model",
      "Large Learning model",
      "Deep neural network"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which type of framework are Apache Spark and Hadoop examples of?",
    "o": [
      "Closed source",
      "Open source",
      "Shareware"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is an action group in Amazon Bedrock Agents?",
    "o": [
      "A team of developers",
      "A set of defined API actions and parameters",
      "A group of foundation models",
      "A set of security policies"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resource represents IP addresses and net masks within virtual private clouds (VPCs) and subnets?",
    "o": [
      "Elastic IP addresses",
      "OSI model",
      "CIDR notation",
      "DNS"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "In AI services that give responses based on prompts, such as Amazon Q, the response to a given prompt will always be the same.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which use cases are best for a large language model (LLM)? (Select THREE.)",
    "o": [
      "Copywriting",
      "Text classification",
      "Text generation",
      "Driving directions"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What provides authentication and authorization for anonymous users in Amazon Location Service?",
    "o": [
      "AWS owned keys",
      "API keys or Amazon Cognito",
      "IAM roles",
      "The AWS account root user"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "How many languages are currently supported by Amazon Translate?",
    "o": [
      "50",
      "75",
      "100",
      "150"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is the maximum number of objects that an Amazon S3 bucket can store?",
    "o": [
      "1 million",
      "100 billion",
      "1 trillion",
      "There is no limit."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A company wants to build a serverless generative AI application. Which AWS services will create a scalable, event-driven architecture with a managed database for the application? (Select THREE.)",
    "o": [
      "AWS Lambda for running serverless functions to handle application logic",
      "Amazon Bedrock for accessing large language models and natural language processing",
      "Amazon RDS for a managed relational database.",
      "AWS Elastic Beanstalk for deploying and scaling web applications."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which resource is a container used to pass an AWS Identity and Access Management (IAM) role to an Amazon EC2 instance?",
    "o": [
      "Instance service",
      "Instance condition",
      "Instance profile",
      "Instance statement"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "When a load balancer detects an unhealthy target, it stops routing traffic to that target even when the target becomes healthy again.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers created an AWS CodePipeline execution for an application by using a custom action. They realize that they must stop the execution of the custom action due to a bug found by a tester. Which action should they take?",
    "o": [
      "Choose Stop and Wait from the CodePipeline console.",
      "Choose Stop and Abandon from the CodePipeline console.",
      "Choose Stop and Hold from the CodePipeline console."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What does a text embedding large language model (LLM) use to produce a multi-dimensional vector that contains the relative relationships of the text in a numerical format.",
    "o": [
      "Numbers",
      "Sentences",
      "Images",
      "Vectors"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Administrators can use an Amazon Cognito identity pool to control who can access their API in Amazon API Gateway.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which method can be used to fine-tune only a small number of parameters in a large pre-trained model?",
    "o": [
      "Reinforcement learning",
      "Parameter-Efficient Fine-Tuning",
      "Low-Rank Adaptation",
      "Logits"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "After a write operation in Amazon DynamoDB, a read request might not reflect the latest data unless another read request is invoked after a short time. Which consistency type is this?",
    "o": [
      "Strongly consistent reads",
      "Eventually consistent reads",
      "Nearly real-time consistency"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which encryption type encrypts data before it is sent to an Amazon S3 bucket?",
    "o": [
      "Client-side",
      "Server-side",
      "Both client-side and server-side"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which capabilities does Amazon Bedrock provide? (Select TWO.)",
    "o": [
      "Provide intelligent recommendations to improve application performance and reduce costs.",
      "Accelerate development of applications by using ML-powered code recommendations.",
      "Offer a unified API to access foundation models from various third-party providers and Amazon.",
      "Help users privately customize foundation models with their own data, using techniques such as fine-tuning."
    ],
    "a": [
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What should users do if their Amazon RDS queries seem to be running slowly? (Select THREE.)",
    "o": [
      "Enable enhanced monitoring on the database instance.",
      "Review the slow query logs for MariaDB or MySQL.",
      "Review the client-side SQL Server traces.",
      "Modify the DB instance to run as a Multi-AZ deployment."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resource does an Amazon Virtual Private Cloud (Amazon VPC) endpoint create in a subnet?",
    "o": [
      "Static route",
      "Elastic network interface (ENI)",
      "IP address",
      "EC2 instance"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statements regarding AWS Identity and Access Management (IAM) policies are true? (Select TWO.)",
    "o": [
      "By default, all requests are allowed.",
      "By default, all requests are denied.",
      "An allow statement overrides a deny statement.",
      "A deny statement overrides an allow statement."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "With Amazon Bedrock, users can privately customize foundation models with their own data by using techniques such as fine-tuning and continued pre-training.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Kendra indexes can connect to third-party data repositories and data sources such as Microsoft SharePoint.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which protocol does Amazon Elastic File System (Amazon EFS) support?",
    "o": [
      "Server Message Blocks (SMB)",
      "File Transfer Protocol (FTP)",
      "Network File System (NFS)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Developers created a custom Amazon Machine Image (AMI) for their EC2 instances. What do they need to do to use the AMI in different AWS Regions?",
    "o": [
      "Copy the AMI to each Region where they want to deploy the image.",
      "Do nothing. Custom AMIs are available in any Region by default.",
      "Custom AMIs are available in all Regions by default, but an access policy must be created."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "When an Amazon Elastic Container Service (Amazon ECS) container agent registers an Amazon EC2 instance into a cluster, the Amazon EC2 instance reports its status as ACTIVE and its agent connection status as FALSE.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "The service feature, Agents for Amazon Bedrock, requires developers to write custom code to provision infrastructure and manage encryption.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which protocol do AWS services use, when encrypting data in motion, to provide encryption between an application and the service?",
    "o": [
      "Transport Layer Security (TLS)",
      "Transport Control Protocol (TCP)",
      "User Datagram Protocol (UDP)",
      "Internet Control Message Protocol (ICMP)"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which two modes does Amazon Comprehend PII analysis provide? (Select TWO.)",
    "o": [
      "Offsets",
      "Offsides",
      "Labels",
      "Entity"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is a benefit of using AWS Transit Gateway for network connectivity on AWS?",
    "o": [
      "It provides direct access to the internet, removing the need for a NAT gateway.",
      "It requires no additional configuration or setup.",
      "It streamlines network architecture by connecting VPCs and VPNs to a central hub.",
      "It provides a dedicated private network connection between VPCs and on-premises networks."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are the capabilities of Amazon SageMaker AI Studio Classic, a web-based integrated development environment (IDE) for machine learning? (Note: SageMaker AI Studio Classic reached end of maintenance Dec 2024. The updated SageMaker Studio is recommended.)",
    "o": [
      "Used only to write and execute code in Jupyter notebooks",
      "Limited to preparing data for machine learning and tracking experiments",
      "Exclusively used to deploy models and monitor their performance",
      "A comprehensive solution used to write code in Jupyter notebooks, prepare data, build and train models, deploy models, and monitor and debug machine learning experiments"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statements regarding Amazon S3 server access logging are true? (Select TWO.)",
    "o": [
      "There is no extra charge for enabling server access logging on an S3 bucket.",
      "There is an extra charge for enabling server access logging on an S3 bucket.",
      "The usual Amazon S3 charges apply for log storage.",
      "The usual Amazon S3 charges do not apply for log storage."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which function can AWS Config perform? (Select THREE.)",
    "o": [
      "Configuration history",
      "Resource inventory",
      "Resource change notifications",
      "Instance sizing recommendations"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statements regarding Amazon Simple Notification Service (Amazon SNS) are true? (Select THREE.)",
    "o": [
      "Amazon SNS requires no maintenance or management overhead.",
      "Messages sent to an Amazon SNS topic are automatically pushed to subscribers.",
      "Amazon SNS supports multiple subscribers to the same topic.",
      "Subscribers poll Amazon SNS for new messages."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service can be used as the storage layer for data lakes?",
    "o": [
      "Amazon EBS",
      "Amazon EC2",
      "Amazon S3",
      "Amazon Redshift"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which logs capture information about IP traffic going to and from network interfaces in a virtual private cloud (VPC)?",
    "o": [
      "VPC flow logs",
      "Amazon CloudWatch logs",
      "Network logs",
      "Gateway logs"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which scenario is an ideal use case for Amazon Personalize?",
    "o": [
      "A user wants real-time file processing invoked by Amazon S3 uploads.",
      "A user wants to generate tailored search results and targeted marketing promotions.",
      "A user wants batch processing of large datasets stored in Amazon S3.",
      "A user wants to build highly available and scalable web applications."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statements about the root user in an AWS account are true? (Select THREE.).",
    "o": [
      "The root user should not be used for everyday tasks.",
      "The root user should be used to create an IAM admin account.",
      "The root user has no permissions by default.",
      "The root user has all permissions by default."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What are runtime properties in Amazon Managed Service for Apache Flink?",
    "o": [
      "The number of subtasks that an application can use",
      "The parameters to specify how an application provisions computing resources",
      "The parallel execution configuration for Amazon Managed Service for Apache Flink application tasks",
      "The parameters that can be provided to an Apache Flink application"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "How can an Amazon S3 bucket owner grant public access to a bucket when configuring it for website hosting?",
    "o": [
      "S3 buckets are publicly accessible by default.",
      "Enabling website hosting on an S3 bucket enables public access by default.",
      "The S3 bucket owner can create a bucket policy."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement is correct regarding AWS Lambda function invocations?",
    "o": [
      "All Lambda invocations are queued for execution.",
      "Users can choose to invoke a function synchronously, asynchronously, or immediately.",
      "Users can choose to invoke a function synchronously or asynchronously."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Using a virtual private cloud (VPC) endpoint, AWS Secrets Manager can connect to AWS Lambda deployed in a VPC without using an internet gateway. Which type of VPC endpoint should be used in this scenario?",
    "o": [
      "Private VPC endpoint",
      "Gateway VPC endpoint",
      "Secure VPC endpoint",
      "Interface VPC endpoint"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which tasks do AWS Glue jobs perform? (Select TWO.)",
    "o": [
      "Extract, transform, and load data",
      "Store relational data files in the cloud",
      "Schedule crawlers to populate a Data Catalog",
      "Act as a serverless, event-driven trigger"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is the primary purpose of Retrieval Augmented Generation (RAG) in Amazon Bedrock Knowledge Bases?",
    "o": [
      "Fine-tune a foundation model.",
      "Improve accuracy by using information from data sources.",
      "Convert text to vectors.",
      "Create new foundation models."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is a valid use case for Amazon Transcribe? (Select THREE.)",
    "o": [
      "Create subtitles for videos.",
      "Analyze call center customer conversations.",
      "Create transcripts from medical interviews.",
      "Convert text to speech."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement best describes an AWS Backup plan?",
    "o": [
      "It is a data transformation script.",
      "It is a documented disaster recovery plan.",
      "It is an intelligent threat detection service.",
      "It is a defined central data protection policy."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which actions does an AWS Glue crawler take when it interrogates a data store? (Select THREE.)",
    "o": [
      "It classifies data to determine the format, schema, and associated properties of the raw data.",
      "It groups data into tables or partitions.",
      "It writes metadata to the AWS Glue Data Catalog.",
      "It creates query results based on the metadata."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Users can enable flow logs for peered virtual private clouds (VPCs) only within the same account.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "A solution that uses Traffic Mirroring contains three components: a source, a target, and a filter.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which policy is used if restricted access is required for a virtual private cloud (VPC) endpoint?",
    "o": [
      "An AWS hybrid policy",
      "A VPC endpoint policy",
      "An AWS security group policy",
      "A firewall policy"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What do users need to create if they want to own and manage hardware security modules (HSMs) provided by an AWS CloudHSM cluster?",
    "o": [
      "A security key store",
      "A customer key store",
      "A security key storage",
      "A custom key store"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Amazon DynamoDB streams do not enforce consistency or transactional capability across multiple tables.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "When using an Amazon EMR cluster, core nodes are optional.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the current version of the policy language that supports policy variables?",
    "o": [
      "2012-10-17",
      "2020-12-17",
      "2008-10-17",
      "2000-10-12"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Which type of problems is the linear learner algorithm, available in Amazon SageMaker AI, used to solve? (Select TWO.)",
    "o": [
      "Anomaly detection",
      "Regression",
      "Classification",
      "Clustering"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "How are portfolios made available to users in AWS Service Catalog? (Select THREE.)",
    "o": [
      "By adding AWS Identity and Access Management (IAM) users to the portfolios",
      "By adding AWS Identity and Access Management (IAM) groups to the portfolios",
      "By adding AWS Identity and Access Management (IAM) roles to the portfolios",
      "By making the users administrators"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which process converts a sentence into words or word fragments before converting the text into a vector for manipulation and analysis by a large language model (LLM)?",
    "o": [
      "Tokenization",
      "Vectorization",
      "Transformation",
      "Normalization"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What are good reasons to use Traffic Mirroring? (Select TWO.)",
    "o": [
      "Content inspection",
      "Network load throttling",
      "Threat monitoring",
      "Content caching"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What does SSML stand for in Amazon Polly?",
    "o": [
      "Simple Speech Memory Language",
      "Speech Synthesis Markup Language",
      "System Speech Management Layer",
      "Structured Speech Model Language"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "TensorFlow is a deep learning framework available only as an Amazon Machine Image (AMI) deployed on an Amazon EC2 instance.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which item is a feature of Amazon SageMaker AI Canvas?",
    "o": [
      "Provides the ability to directly edit the source code of machine learning models.",
      "Provides a no-code development environment to build machine learning models without programming knowledge.",
      "Supports manual tuning of hyperparameters for machine learning models.",
      "Provides the deployment of machine learning models direct to edge devices."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which task is MOST commonly supported by large language models (LLMs) on Amazon Bedrock?",
    "o": [
      "Generate code based on specifications.",
      "Recognize images.",
      "Recognize speech.",
      "Analyze videos."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "The Amazon CloudWatch alarm hard limit for an account is 5000 and cannot be increased.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which cells in a Jupyter notebook provide a complete computational record of a session? (Select THREE.)",
    "o": [
      "Markdown",
      "Code",
      "Raw output",
      "JSON"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which function does an AWS Glue crawler perform?",
    "o": [
      "Stores extracted data for future analysis",
      "Defines the flow of data sources, transformations, and targets",
      "Creates, runs, and monitors ETL workflows",
      "Connects to a data store and extracts the schema of data"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statement about the automatic key rotation for AWS Key Management Service (AWS KMS) is true? (Select TWO.)",
    "o": [
      "When key rotation is enabled, AWS KMS generates new cryptographic material for the KMS key every two years.",
      "By default, when key rotation is enabled, AWS KMS generates new cryptographic material for the KMS key every year.",
      "AWS KMS saves all previous versions of the cryptographic material in perpetuity until the KMS key is deleted.",
      "AWS KMS does not save previous versions of the cryptographic material due to security reasons."
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS resource do users associate with the firewall endpoint when configuring AWS Network Firewall?",
    "o": [
      "An Amazon S3 bucket",
      "An Amazon EC2 instance",
      "A VPC subnet",
      "An IAM role"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Volumes in Amazon Elastic Block Store (Amazon EBS) are automatically replicated within an Availability Zone.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "The default view for the AWS Management Console displays all resources in all Regions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "With the Spark UI, users can check the event timeline of each Spark stage.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which encryption type encrypts data as it's written to an Amazon S3 bucket?",
    "o": [
      "Client-side",
      "Server-side",
      "Both client-side and server-side"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What should an engineer do to optimize resources for better performance in AWS IoT TwinMaker scenes?",
    "o": [
      "Use complex model geometry and meshes to improve visual quality.",
      "Increase the size and complexity of resources to enhance scene details.",
      "Reduce the complexity of 3D models to improve frame rate and loading times.",
      "Avoid optimizing resources because AWS IoT TwinMaker automatically optimizes them."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "How frequently does AWS Key Management Service (AWS KMS) rotate a key by default when rotation is enabled?",
    "o": [
      "Once a month",
      "Once every 3 months",
      "Once every 6 months",
      "Once a year"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which resources can administrators use to build fine-grained authorization to protect their APIs? (Select THREE.)",
    "o": [
      "An Amazon Cognito user pool",
      "An Amazon Cognito identity pool",
      "AWS Identity and Access Management (IAM)",
      "An Amazon API Gateway authorizer"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS service is primarily used to automate the setup of inter-Region peering with AWS Transit Gateway?",
    "o": [
      "AWS Direct Connect",
      "Amazon VPC",
      "AWS CloudFormation",
      "AWS Lambda"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "In AWS CloudFormation, before making changes to resources, users can generate a summary of proposed changes. What is this summary called?",
    "o": [
      "Change record",
      "Change set",
      "Change resource",
      "Change template"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Vector databases provide the ability to store and retrieve vectors as high-dimensional points.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the final output of an AWS Identity and Access Management (IAM) policy that is created by using the visual editor?",
    "o": [
      "JavaScript",
      "XML",
      "JSON",
      "Python"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which type of scaling is used when the number of Amazon EC2 instances is increased behind a load balancer?",
    "o": [
      "Vertical",
      "Horizontal"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is required to enable internet access for instances in a public subnet?",
    "o": [
      "Associate an Elastic IP address with each instance in the public subnet.",
      "Create a NAT gateway in the public subnet.",
      "Configure a route table with a destination of 0.0.0.0/0 to the internet gateway.",
      "Enable the auto-assign public IP feature on the public subnet."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service is a key-value and document database that delivers single-digit millisecond performance at any scale?",
    "o": [
      "Amazon RDS",
      "Amazon Route 53",
      "Amazon DynamoDB",
      "Amazon Aurora"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS service is a cloud-scale business intelligence service that can deliver easy-to-understand insights?",
    "o": [
      "Amazon Athena",
      "AWS Data Exchange",
      "AWS Lake Formation",
      "Amazon Quick"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is AWS CodeBuild?",
    "o": [
      "A service that automatically scales your compute resources based on your workload",
      "A fully managed continuous integration service",
      "A service for running containerized applications on a managed cluster",
      "A service for automating software deployments"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "While using an Amazon Bedrock foundation model (FM) to generate a children's story, the user notices that the story consistently stops mid-sentence. What is the most likely solution to fix this truncation issue?",
    "o": [
      "Decrease the temperature setting.",
      "Add more prompt examples.",
      "Increase the model's max tokens.",
      "Switch to a different model version."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Protecting data at rest also applies to limiting the number of people who have access to sensitive data.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which authentication methods can the engineer use for Amazon Managed Grafana workspaces? (Select TWO.)",
    "o": [
      "User credentials stored in identity providers (IdPs) that support SAML 2.0",
      "AWS Identity and Access Management (IAM) roles and policies",
      "AWS IAM Identity Center",
      "Built-in Grafana user authentication and authorization"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Financial Services",
    "q": "AWS Glue can automatically discover both structured and semistructured data stored in a data lake on Amazon S3, a data warehouse in Amazon Redshift, and various databases running on AWS.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the MOST recommended method for authenticating IoT devices with AWS IoT Core?",
    "o": [
      "Use a shared secret key for all devices.",
      "Use X.509 client certificates with a unique certificate per device.",
      "Use username and password authentication.",
      "Use Amazon Cognito user pools for device authentication."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the recommended approach for managing user access to Amazon Managed Grafana workspaces?",
    "o": [
      "The security engineer uses the Amazon Managed Grafana console to provision new users and groups, and manages their workspace access from the same console.",
      "The security engineer uses the AWS Identity and Access Management (IAM) console to provision new users and groups, and manages their workspace access from the Amazon Managed Grafana console.",
      "The security engineer uses the AWS IAM Identity Center console to provision new users and groups, and manages their workspace access from the Amazon Managed Grafana console.",
      "The security engineer uses the Amazon Managed Grafana console to provision new users and groups, and manages their workspace access from the AWS Identity and Access Management (IAM) console."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What does generative AI primarily do?",
    "o": [
      "Analyzes large datasets",
      "Creates various types of content, such as images, music, and stories",
      "Performs sentiment analysis",
      "Conducts image classification"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "A subnet can span multiple Availability Zones.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "The AWS Glue Data Catalog maintains a comprehensive schema version history that helps users understand how their data has changed over time.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "In AWS Transit Gateway, blackhole routes can be added manually to a transit gateway route table to block specific IP addresses or ranges.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the MOST important factor in determining the quality of responses generated by Amazon Bedrock large language models (LLMs)?",
    "o": [
      "The inference parameters used for the LLM",
      "The quality of the prompt provided to the LLM",
      "The specific LLM model selected",
      "The hardware configuration used for inference"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service monitors AWS resources and the applications that run on AWS in near real time?",
    "o": [
      "Amazon CloudWatch",
      "AWS CloudTrail",
      "AWS Config",
      "AWS X-Ray"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "How can users access and interact with the large language models (LLMs) available in Amazon Bedrock?",
    "o": [
      "By using a command-line interface (CLI) provided by AWS",
      "By deploying the LLMs on their own infrastructure",
      "By using the Amazon Bedrock playgrounds for text, chat, and image tasks",
      "By directly modifying the LLM's source code and retraining it"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How do users enable DNS Firewall protections for a virtual private cloud (VPC) in Amazon Route 53 Resolver?",
    "o": [
      "Configure the VPC's outbound DNS queries through DNS Firewall, and associate rule groups with the VPC.",
      "Associate one or more rule groups with the VPC.",
      "Configure Route 53 Resolver to handle DNS queries for the VPC during a failure, and associate rule groups with the VPC.",
      "Configure the DNS query responses in Route 53 Resolver."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which languages does an AWS CloudFormation template support? (Select TWO.)",
    "o": [
      "Node.js",
      "YAML",
      "Python",
      "JSON"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS services can virtual private cloud (VPC) flow logs be published to? (Select THREE.)",
    "o": [
      "Amazon S3",
      "AWS CloudTrail",
      "Amazon CloudWatch Logs",
      "Amazon Data Firehose"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statements accurately describe the capabilities of agents in Amazon Bedrock? (Select THREE.)",
    "o": [
      "Agents can connect to external APIs and plugins to extend their functionality.",
      "Agents can make their own plans and run tasks without step-by-step instructions.",
      "Agents can use only a single tool or resource at a time.",
      "Agents can use the output of one tool as input for another tool."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers want to audit new user data and identify invalid social security numbers asynchronously. An AWS Lambda function is used to check the data. Which Amazon DynamoDB feature can be used to invoke the Lambda function?",
    "o": [
      "DynamoDB Poll",
      "DynamoDB Streams",
      "DynamoDB Global Table",
      "DynamoDB Secondary Index"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What is the best description of the type of consistent reads that Amazon DynamoDB supports? (Select TWO.)",
    "o": [
      "Eventually",
      "Strongly",
      "Weakly",
      "Loosely"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements are true about a table in the AWS Glue Data Catalog? (Select THREE.)",
    "o": [
      "A table is the metadata definition that represents the data in a data store.",
      "A table is written to a database in the Data Catalog.",
      "Only one table can be contained in a database in the Data Catalog.",
      "Attributes of a table include classification, which helps to infer the table schema."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resources can be Traffic Mirroring targets? (Select TWO.)",
    "o": [
      "An Amazon EC2 instance",
      "A network interface",
      "A Network Load Balancer",
      "An Amazon CloudFront edge location"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which options are fields in a VPC Flow Logs record? (Select THREE.)",
    "o": [
      "Source IP address",
      "VPC ID",
      "Instance role",
      "Destination port"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service is a natural-language processing (NLP) service that uses machine learning to uncover valuable insights in text?",
    "o": [
      "Amazon Polly",
      "Amazon Comprehend",
      "Amazon Textract",
      "Amazon Lex"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "A destination Amazon S3 bucket must be defined before running Amazon Athena queries.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service can streaming data be loaded into, using Amazon Data Firehose? (Select THREE.)",
    "o": [
      "Amazon OpenSearch Service",
      "Amazon Redshift",
      "Amazon RDS",
      "Amazon S3"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "By default, newly created Amazon S3 buckets are not publicly accessible.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "An Amazon DynamoDB table uses SongID as the partition key and has no sort key. Other table attributes include SingerID, SingerName, Genre, LaunchYear, Album, SongDuration, NumberOfViews, and the NumberOfLikes of a song. Which action is the best way to find the most-viewed songs, launched in 2010, by SingerID?",
    "o": [
      "Create a global secondary index that uses SingerID as a partition key and LaunchYear as the sort key.",
      "Create a global secondary index that uses SingerID as a partition key and NumberOfPlays as the sort key.",
      "Create a global secondary index that uses SingerID as a partition key and LaunchYear:NumberOfViews as the concatenated sort key."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Virtual private cloud (VPC) peering on AWS can be used to allow routing between VPCs that belong to different AWS accounts.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "AWS Lambda automatically monitors Lambda functions on behalf of users and reports metrics through Amazon CloudWatch. What are these metrics? (Select THREE.)",
    "o": [
      "Number of requests",
      "Request source IP",
      "Execution duration per request",
      "Number of requests that result in an error"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "An AWS account can have more than one AWS Glue Data Catalog per AWS Region.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which social identity providers does Amazon Cognito support? (Select THREE.)",
    "o": [
      "Amazon",
      "Facebook",
      "Google",
      "Microsoft"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon EMR usage is charged per second.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Transcribe supports the automatic addition of punctuation to transcriptions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "The AWS Glue Data Catalog provides out-of-box integration with some AWS services. After table definitions are added to the Data Catalog, the tables are available for extract, transform, load, and query in these services. Which AWS services are integrated with the Data Catalog? (Select THREE.)",
    "o": [
      "Amazon Athena",
      "Amazon EMR",
      "Amazon ECR",
      "Amazon Redshift Spectrum"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "When developers start to type out single lines of code or comments, Amazon Q can make suggestions based on current and previous inputs.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resources can be monitored with flow logs? (Select THREE.)",
    "o": [
      "VPCs",
      "Subnets",
      "Elastic IPs",
      "Network interfaces"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Amazon Rekognition supports billions of labels belonging to common categories, such as \"People and Events\" or \"Food and Drink.\"",
    "o": [
      "FALSE",
      "TRUE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which options are valid Amazon Titan models on Amazon Bedrock? (Select THREE.)",
    "o": [
      "Amazon Titan Text Premier",
      "Amazon Titan Text Express",
      "Amazon Titan Text Retrieve",
      "Amazon Titan Text Embeddings V2"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which types of traffic inspection does AWS Network Firewall support?",
    "o": [
      "HTTP and FTP only",
      "HTTPS and SFTP only",
      "Stateful, stateless, and intrusion prevention system (IPS)",
      "Stateless only"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service provides object storage and is built to store and retrieve any amount of data from anywhere on the Internet?",
    "o": [
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Simple Notification Service (Amazon SNS)",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic Compute Cloud (Amazon EC2)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which services can be used to help ingest data into Amazon OpenSearch Service? (Select TWO.)",
    "o": [
      "Elasticsearch",
      "Amazon Simple Queue Service (Amazon SQS)",
      "AWS Lambda",
      "AWS DataSync"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How can AWS Step Functions be used in the context of inter-Region peering, using AWS Transit Gateway?",
    "o": [
      "Step Functions is used to automate the setup of inter-Region peering connections.",
      "Step Functions provides orchestration and coordination capabilities for managing complex workflows involved in inter-Region peering.",
      "Step Functions enables real-time monitoring and alerting for inter-Region peering events and changes.",
      "Step Functions is used to perform data transformation and manipulation during inter-Region peering processes."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Redshift Spectrum resides on dedicated Amazon Redshift servers that are independent of a user's cluster.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What do users pay for when using AWS Secrets Manager? (Select TWO.)",
    "o": [
      "The number of secrets managed",
      "The number of secret versions",
      "The number of API calls made",
      "The number of times that secrets are retrieved"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "When creating IAM policies, administrators should grant only the permissions required to perform a task. What are administrators granting in this case?",
    "o": [
      "Access denied",
      "Least privilege",
      "Effect deny",
      "Minimal privilege"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the purpose of including metadata files (such as .json files) along with the data source files in an Amazon Bedrock knowledge base?",
    "o": [
      "Compress the data source files for efficient storage.",
      "Encrypt the data source files for security purposes.",
      "Split the data source files into smaller chunks.",
      "Filter the results retrieved from the vector database."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is an example of encrypting an Amazon Elastic Block Store (Amazon EBS) volume attached to an Amazon EC2 instance?",
    "o": [
      "Protecting data at rest",
      "Protecting data in transit",
      "Protecting data on premises"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "For knowledge-intensive search applications, developers can use a generative AI large language model (LLM) to get relevant knowledge first, and then query a vector database to generate content.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Textract feature helps process specific data from tables and forms?",
    "o": [
      "DetectDocumentText",
      "AnalyzeDocument",
      "Query",
      "Key-value pair extraction"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which types of rules can be configured in DNS Firewall, a feature of Amazon Route 53 Resolver?",
    "o": [
      "Domain-based rules",
      "HTTP-based rules and TCP-based rules",
      "UDP-based rules and ICMP-based rules",
      "DNS-based rules and SSL-based rules"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "AWS Lambda is a compute service that helps users run code. What do users no longer need to provision or manage when using Lambda?",
    "o": [
      "Applications",
      "Servers",
      "Documentation",
      "The AWS Management Console"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which parameter in generative AI models controls the randomness or creativity of responses?",
    "o": [
      "max_tokens",
      "temperature",
      "top_p",
      "messages"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which types of secrets can users manage in AWS Secrets Manager? (Select THREE.)",
    "o": [
      "Database credentials",
      "Third-party API keys",
      "Secure Shell (SSH) keys",
      "Data center keys"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is true regarding replication on an Amazon S3 bucket? (Select TWO.)",
    "o": [
      "Only one destination bucket can be configured.",
      "Multiple destination buckets can be configured.",
      "Objects are copied to the destination bucket synchronously.",
      "Objects are copied to the destination bucket asynchronously."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which compression formats does Amazon Data Firehose support? (Select THREE.)",
    "o": [
      "GZIP",
      "ZIP",
      "7-zip",
      "Snappy"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Amazon CloudFront provides integration with AWS WAF for additional security and protection against web-based attacks.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which statement accurately describes a key capability of AWS IoT Greengrass?",
    "o": [
      "It enables devices to collect and analyze data closer to the source.",
      "It provides a centralized platform for managing and monitoring IoT devices.",
      "It offers a secure communication channel between IoT devices and the AWS Cloud.",
      "It facilitates over-the-air firmware updates for IoT devices."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "An Amazon EBS backed EC2 instance must be in a specific state to change its instance type. Which one?",
    "o": [
      "Stopped",
      "Running",
      "Terminated",
      "Imaged"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "A convolutional neural network (CNN) is a class of artificial neural network. What does a CNN specialize in classifying?",
    "o": [
      "Images",
      "Speech",
      "Anomalies",
      "Fraud"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Inter-Region peering, using AWS Transit Gateway, is available in all AWS Regions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A user causes an Auto Scaling group to drop below the defined minimum by manually terminating an instance. What is the outcome?",
    "o": [
      "Nothing.",
      "The entire Auto Scaling group is shut down.",
      "A new minimum number is set.",
      "A new instance is launched to meet the minimum requirement."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statement best describes the purpose of AWS Identity and Access Management (IAM) roles?",
    "o": [
      "IAM roles are used to manage user access to the AWS Management Console.",
      "IAM roles are used to grant permissions to AWS resources to access other AWS services and resources.",
      "IAM roles are used to define resource limits and quotas for AWS services.",
      "IAM roles are used to configure billing and cost management settings for an AWS account."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A data scientist is building a machine learning model that requires large language models (LLMs) for training. The scientist can use Amazon Bedrock to invoke multiple foundation models (such as Anthropic, Claude, and Jurassic) to efficiently generate training data.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the primary purpose of fine-tuning in generative AI?",
    "o": [
      "Create a foundation model.",
      "Increase the number of parameters in a model.",
      "Adapt a pretrained model to specific tasks or domains.",
      "Reduce the size of a model."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "A bot is the primary resource type in Amazon Lex. What are other Amazon Lex resource types? (Select TWO.)",
    "o": [
      "Intent",
      "Voice",
      "Text",
      "Slot type"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "A user connects to an Amazon Redshift cluster by using temporary credentials. What does the user need to provide to authenticate access for the connection? (Select TWO.)",
    "o": [
      "A database name",
      "A secret password",
      "A secret key",
      "A database user"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which Amazon EC2 pricing model adjusts based on supply and demand of EC2 instances?",
    "o": [
      "On-Demand Instances",
      "Reserved Instances",
      "Spot Instances",
      "Convertible Reserved Instances"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "AWS Transit Gateway supports dynamic routing protocols, such as Border Gateway Protocol (BGP).",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which components exist in an AWS Config configuration item? (Select THREE.)",
    "o": [
      "Metadata",
      "Data flow",
      "Attributes",
      "Relationships"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which scenario is a potential use case for AWS IoT SiteWise?",
    "o": [
      "Monitor and analyze data from industrial equipment across multiple facilities.",
      "Develop and deploy machine learning models for predictive maintenance.",
      "Enable real-time communication between industrial devices and cloud services.",
      "Offer a solution for developing and deploying industrial IoT applications."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which services are integrated with Amazon OpenSearch Service? (Select TWO.)",
    "o": [
      "Amazon S3",
      "Amazon Comprehend",
      "Amazon Quick",
      "Amazon OpenSearch Dashboards"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "When an Amazon Web Services (AWS) account is first created, one user identity has complete access to all AWS services and resources. What is this type of user?",
    "o": [
      "Admin",
      "SA",
      "Root",
      "Super"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon EMR supports compressed .csv files as a data source.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the purpose of the AWS IoT Greengrass nucleus component?",
    "o": [
      "Enable local IoT devices to connect securely to the core device.",
      "Publish custom metrics from the core device to Amazon CloudWatch.",
      "Configure and update the AWS IoT Greengrass Core software on core devices.",
      "Filter and aggregate device data on the core device before sending it to the cloud."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What are LangChain tools? (Select TWO.)",
    "o": [
      "Pre-built components that allow language models to interact with external systems and data sources",
      "Custom-built components that require coding from scratch for each use case",
      "Tools that enable language models to perform tasks such as data retrieval, analysis, and generation",
      "Proprietary tools developed by OpenAI for use with their language models"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "A junior developer, working on a large software suite, wants some minor code changes reviewed before pushing to merge the code into the main branch. Which action should the developer take?",
    "o": [
      "Create a pull request.",
      "Submit a merge application.",
      "Create a source conflict review."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Key Management Service (AWS KMS) generates, stores, manages, and tracks data keys. AWS KMS also performs cryptographic operations with data keys.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is the best method to help AI users submit a text prompt and generate an image?",
    "o": [
      "Experiment with text models.",
      "Use the Amazon Bedrock image playground.",
      "Compare the output of up to three chat models.",
      "Customize a base foundation model."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "By default, a user-created Amazon Machine Image (AMI) is available in all AWS Regions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Users pay for the time that their AWS Glue job runs, including the environment provisioning and shutdown time.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which option is defined as deploying your machine learning (ML) models to make predictions with Amazon SageMaker AI?",
    "o": [
      "Parallelism",
      "Transformation",
      "Inference",
      "Processing"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers are using AWS CodePipeline to manage the deployment of a Java application. A new code change has just been pushed through that has invoked a new build and automated tests. What is this activity called?",
    "o": [
      "Source change",
      "Continuous delivery",
      "Continuous integration"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which changes will appear in AWS CloudFormation drift detection?",
    "o": [
      "Changes to security groups",
      "Changes to AWS roles and profiles associated with the resource",
      "Changes made within the operating system of an Amazon EC2 instance",
      "Changes made to settings on a load balancer"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "When peering relationships are established between virtual private clouds (VPCs) across different AWS Regions, traffic always stays on the global AWS backbone and never traverses the public internet.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can be included when creating an Amazon Machine Image (AMI)? (Select THREE.)",
    "o": [
      "Installed software",
      "Operating system",
      "Public IP address",
      "EBS snapshots"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "The AWS Systems Manager Run Command document, AWS-InstallCloudWatchAgent, can be used to install the Amazon CloudWatch agent on Amazon EC2 instances and on-premises servers.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What does an Amazon Cognito user pool provide? (Select THREE.)",
    "o": [
      "Sign-up and sign-in services",
      "Temporary AWS credentials to access AWS services",
      "A user directory",
      "Security features, such as multi-factor authentication (MFA), to protect user identity"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resource is used to reach AWS services that do not reside within a virtual private cloud (VPC), such as Amazon S3, without the traffic traversing the internet?",
    "o": [
      "An internet gateway",
      "A NAT gateway",
      "The Amazon private channel network",
      "AWS PrivateLink"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statements about AWS WAF are true? (Select THREE.)",
    "o": [
      "AWS WAF rule propagation and updates take under a minute.",
      "AWS WAF Bot Control provides visibility and control over common and pervasive bot traffic to applications.",
      "AWS WAF can only be configured using the AWS Management Console.",
      "AWS WAF can be completely administered through AWS WAF APIs."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What are benefits of LangChain? (Select THREE.)",
    "o": [
      "Repurpose language models for domain-specific applications.",
      "Simplify AI development by abstracting complexity.",
      "Provide developer support through an active community.",
      "Enable fine-tuning of large language models on proprietary data."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which video subtitle file formats can Amazon Transcribe generate? (Select TWO.)",
    "o": [
      "TRS",
      "WebVTT",
      "SubRip",
      "CC"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which features are offered by Amazon Q? (Select THREE.)",
    "o": [
      "Summarizing data",
      "Diagnosing console errors",
      "Performing system operations",
      "Supporting popular programming languages"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which resources can be configured to notify users when an administrator deletes a secret in AWS Secrets Manager?",
    "o": [
      "Amazon CloudWatch logs",
      "Amazon EventBridge (formerly Amazon CloudWatch Events) events",
      "Amazon CloudWatch metrics",
      "AWS X-Ray traces"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the duration of high-resolution alarms in Amazon CloudWatch?",
    "o": [
      "Less than 60 seconds",
      "Less than 30 seconds",
      "Less than 10 seconds",
      "Less than 1 second"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can be changed to scale an Amazon EC2 instance to the demands of a workload?",
    "o": [
      "Region",
      "Availability Zone",
      "DNS",
      "Type"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What does a newly created security group do by default with network traffic?",
    "o": [
      "Blocks all inbound and outbound traffic",
      "Allows all inbound and outbound traffic",
      "Blocks all inbound traffic, but allows all outbound traffic",
      "Blocks all outbound traffic, but allows all inbound traffic"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which statement is true about peering virtual private clouds (VPCs) in different AWS accounts, using inter-Region peering with AWS Transit Gateway?",
    "o": [
      "Inter-Region peering of VPCs in different AWS accounts is supported and can be quickly configured.",
      "Inter-Region peering is limited to VPCs within the same AWS account.",
      "Inter-Region peering of VPCs in different AWS accounts is supported, but it requires manual configuration and additional permissions.",
      "Inter-Region peering can only be established between VPCs in the same AWS Region."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement best describes AWS Backup?",
    "o": [
      "It is an online data movement and discovery service.",
      "It is a serverless data storage service.",
      "It is an automated and centralized data protection service.",
      "It is a data transformation service."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service is used as the primary storage resource for a data lake, due to its virtually unlimited scalability and 99.999999999 percent (11 9s) of data durability?",
    "o": [
      "Amazon Neptune",
      "Amazon DocumentDB",
      "Amazon S3",
      "Amazon DynamoDB"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which definition of a Traffic Mirroring source is correct?",
    "o": [
      "An Amazon EC2 instance that a user wants to monitor",
      "A network interface for the Amazon EC2 instance that a user wants to monitor",
      "A virtual private cloud (VPC) that contains the Amazon EC2 instance that a user wants to monitor",
      "An Availability Zone that contains the Amazon EC2 instance that a user wants to monitor"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which tool can be used to find out when a secret is stored or rotated in AWS Secrets Manager?",
    "o": [
      "Amazon Macie",
      "AWS CloudTrail logs",
      "Amazon CloudWatch logs",
      "Amazon Inspector"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "The quality of prompts provided to large language models (LLMs) can impact the quality of their responses.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which aspect of software development does Amazon Q help developers perform? (SELECT THREE).",
    "o": [
      "Design and build",
      "Test and secure",
      "Manage and optimize cloud resources",
      "Review and deploy code"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which format are Amazon S3 bucket policies and IAM policies written in?",
    "o": [
      "JSON",
      "HTML",
      "CSV",
      "XML"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which items are types of Amazon Virtual Private Cloud (Amazon VPC) endpoints? (Select TWO.)",
    "o": [
      "Interface endpoint",
      "Private endpoint",
      "DNS endpoint",
      "Gateway endpoint"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the purpose of Amazon Bedrock?",
    "o": [
      "Generate real-time code suggestions.",
      "Provide a machine learning infrastructure.",
      "Provide an accessible API for foundation models.",
      "Serve as a machine learning hub."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which sensitivity level in a SQL injection rule statement in AWS WAF detects more SQL injection attacks but also generates more false positives?",
    "o": [
      "HIGH",
      "LOW",
      "Both",
      "Neither"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "If Amazon Comprehend is highly confident, the score will be close to 1.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What are benefits of AWS Serverless Application Model (AWS SAM)? (Select THREE.)",
    "o": [
      "Single deployment configuration",
      "Local debugging and testing",
      "Collection of serverless applications",
      "Extension of AWS CloudFormation"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which statement, in general terms, is a good design principle for serverless applications?",
    "o": [
      "Functions must execute a long chain of commands that can take a few minutes or hours depending on the business case.",
      "Functions are concise, short, and single purpose and their environment may live up to their request lifecycle.",
      "Function code must use CPU flags to choose the right algorithm to execute."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Amazon Athena can process unstructured, semistructured, and structured datasets.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which DNS record type is used to identify an incoming mail server (mail exchange record)?",
    "o": [
      "A",
      "MX",
      "CNAME",
      "AAAA"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which resource is a logical reference to a lifecycle state of an API; for example, 'dev', 'prod', 'beta', and 'v2'?",
    "o": [
      "An API deployment",
      "An API stage",
      "An API key",
      "An API method"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service is fully managed and helps developers create, publish, maintain, monitor, and secure APIs at any scale?",
    "o": [
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Simple Queue Service (Amazon SQS)",
      "Amazon API Gateway",
      "Amazon Elastic Compute Cloud (Amazon EC2)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "By default, when created through the AWS Management Console, Amazon RDS will retain a backup of a DB instance for a period of 7 days.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Kendra supports real-time collaboration for document editing within its search interface.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What can users connect their AWS Lambda function to in their virtual private cloud (VPC) to access private AWS resources while the function is running?",
    "o": [
      "Public subnets",
      "Private subnets",
      "VPC endpoints",
      "Internet gateway"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is the Amazon States Language?",
    "o": [
      "Another term for AWS Step Functions Workflow Studio",
      "A low-code visual workflow designer for AWS Step Functions",
      "A JSON-based, structured language used to define AWS Step Functions state machines",
      "An internal JSON structure that contains information about AWS Step Functions state machines and executions"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "When subscribing an email address to an Amazon Simple Notification Service (Amazon SNS) topic, users must confirm the subscription before the email address can start to receive messages.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which components do AWS Glue crawlers, jobs, and development endpoints use to access certain types of data stores?",
    "o": [
      "Amazon Redshift clusters",
      "AWS Glue connections",
      "AWS Directory Service directories",
      "Amazon Athena queries"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "When creating an AWS Identity and Access Management (IAM) role in the AWS Management Console, an instance profile with the same name is automatically created.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resource is a network transit hub that can be used to interconnect virtual private clouds (VPCs)?",
    "o": [
      "VPN connection",
      "AWS Direct Connect gateway",
      "Transit gateway",
      "VPC peering connection"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Amazon Athena is an interactive query service that is used to analyze data by using standard SQL. Which storage service does Athena work with?",
    "o": [
      "Amazon DynamoDB",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Redshift"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What are the three main agent sequence steps during the runtime process of an Amazon Bedrock agent?",
    "o": [
      "Building, testing, and deployment",
      "Configuration, execution, and monitoring",
      "Preprocessing, orchestration, and post-processing",
      "Input validation, API calls, and response generation"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which AWS service is used to store the query results from Amazon Athena?",
    "o": [
      "Amazon S3",
      "Amazon DynamoDB",
      "Amazon RDS",
      "Amazon ElastiCache"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "By default, S3 Versioning is disabled on buckets, and it must be explicitly enabled.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS resources can be used to create and configure an AWS CloudFormation template? (Select TWO.)",
    "o": [
      "JSON",
      "Python",
      "C#",
      "YAML"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Amazon CloudWatch has two types of API logging. Which type can use Amazon API Gateway to manage CloudWatch logs.",
    "o": [
      "Access logging",
      "Execution logging",
      "Automatic logging"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "In Amazon Route 53, users can associate multiple IP addresses with a single record.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "An AWS Identity and Access Management (IAM) entity, such as a user or group, can have multiple policies attached.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which document formats are supported for ingestion into an Amazon Bedrock knowledge base? (Select THREE.)",
    "o": [
      ".html",
      ".pdf",
      ".md",
      ".png"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How do rate-based rules in AWS WAF help protect against DDoS attacks?",
    "o": [
      "They limit the amount of traffic allowed to access a resource over a set period of time.",
      "They block traffic based on specific IP addresses or user agents.",
      "They analyze traffic patterns to detect and prevent attacks in real time.",
      "They filter traffic based on specific criteria."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How can AWS Lambda be used in the context of inter-Region peering, using AWS Transit Gateway?",
    "o": [
      "Lambda is used to automate the configuration of inter-Region peering connections.",
      "Lambda provides serverless compute capabilities for processing and manipulating data during the inter-Region peering process.",
      "Lambda enables real-time monitoring and alerting for inter-Region peering events and changes.",
      "Lambda is used to perform data transfers and replication between VPCs in different AWS Regions."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Using the service feature, Agents for Amazon Bedrock, developers can build autonomous agents that can connect to external APIs and data sources.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "After infrastructure is defined in AWS CDK code, which service provisions the resources?",
    "o": [
      "AWS CloudFormation",
      "Amazon CloudFront",
      "Amazon CloudWatch",
      "AWS Cloud9"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Identity and Access Management (IAM) policies can be written in XML, JSON, or YAML format.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which languages does AWS Lambda support natively?",
    "o": [
      "Java, Go, PowerShell, Node.js, C#, Python, and Ruby code",
      "Java, Cobol, PowerShell, Node.js, C#, Python, and Ruby code",
      "Cobol, C++, C#, Java, Node.js, and Go"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Translate feature helps customize translations with the user's own terminology?",
    "o": [
      "Custom terminology",
      "Neural machine translation",
      "Active Custom Translation",
      "Parallel data"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is a stateful rule group, in the context of AWS Network Firewall?",
    "o": [
      "A set of rules that strictly applies to inbound traffic",
      "A set of rules that governs how the network firewall transitions between states",
      "A set of rules that monitors the lifecycle of a connection and inspects all packets for a tracked connection",
      "A set of rules that applies only to outbound traffic"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is the name for a collection of rules and remediation actions, built by using a common framework and packaging model, in AWS Config?",
    "o": [
      "Amazon CloudWatch alarms",
      "Conformance packs",
      "Resource configurations",
      "Governance policies"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "With the COGNITO_USER_POOLS authorizer, if the OAuth Scopes option is not specified, Amazon API Gateway treats the supplied token as an identity token.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What are primary benefits of using prompt engineering techniques in generative AI applications? (Select TWO.)",
    "o": [
      "Remove the need for model training.",
      "Improve response accuracy and relevance.",
      "Reduce the computational resources required.",
      "Provide control over model output style and format."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which type of gateway enables instances in a private subnet to connect to the internet?",
    "o": [
      "Transit gateway",
      "Customer gateway",
      "Internet gateway",
      "NAT gateway"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS Identity and Access Management (IAM) permission is required for Amazon Q to give developers coding assistance in the AWS Lambda editor?",
    "o": [
      "GenerateCode",
      "CreateSuggestioins",
      "GenerateRecommendations",
      "CreateFunction"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which service must an AWS Lambda function access to work correctly when configuring the Lambda execution role?",
    "o": [
      "Amazon X-Ray",
      "Amazon CloudWatch Logs",
      "Amazon DynamoDB"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which API operation is used to submit prompts and generate responses from foundation models (FMs) when working with Amazon Bedrock?",
    "o": [
      "GenerateModelResponse",
      "InvokeModel",
      "CreateModelInference",
      "ExecutePrompt"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement regarding Amazon EC2 instances is true?",
    "o": [
      "An AMI is a template used for launching new instances with identical configurations.",
      "A new EC2 instance, created from an AMI, must be of the exact same instance type as the instance that the AMI was created from.",
      "The size of an EC2 instance cannot be increased after it is created.",
      "An Auto Scaling group is automatically created when an AMI is built."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Amazon Q is not giving accurate code suggestions to the comments provided by a user in the AWS Lambda code editor. What is the best way to improve these Amazon Q suggestions?",
    "o": [
      "Make sure that the comments are clear and concise.",
      "Add more code examples.",
      "Switch the programming language.",
      "Increase indent spacing."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Which security measure is used by Amazon Translate to protect data?",
    "o": [
      "SSL encryption for communication",
      "Storing content unencrypted in AWS Regions",
      "Allowing unrestricted public access to the service",
      "No security controls are needed because it is a free public service"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which constraint type in AWS Service Catalog can be used to specify rules that must be met before a product can be provisioned?",
    "o": [
      "Launch",
      "Notification",
      "Resource update",
      "Access"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What do Application Load Balancers use to verify that traffic should be sent to a target?",
    "o": [
      "Security group",
      "Health check",
      "Scaling policy",
      "Subnet"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS services help extract information from images and videos? (Select THREE.)",
    "o": [
      "Amazon Rekognition",
      "Amazon Textract",
      "Amazon Transcribe",
      "Amazon Comprehend"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Amazon SageMaker AI Studio is a fully integrated development environment for machine learning.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What are the three main functions of Amazon Route 53? (Select THREE.)",
    "o": [
      "Domain registration",
      "Fraud detection",
      "DNS routing",
      "Health checking"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is needed, first, to use an Amazon Cognito user pool with an API?",
    "o": [
      "An API",
      "An authorizer",
      "An endorser",
      "A method"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of policies are JSON permissions policy documents that control what actions an identity (users, groups of users, and roles) can perform, on which resources, and under what conditions?",
    "o": [
      "Resource-based",
      "Identity-based",
      "Service-based",
      "Access-based"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which protocols can be used in Amazon Simple Notification Service (Amazon SNS) so that subscribers can consume (or receive) messages?",
    "o": [
      "MTQQ, Amazon SQS, HTTP/S, email, SMS, AWS Lambda function",
      "Amazon SQS, HTTP/S, email, SMS, AWS Lambda function",
      "Amazon SQS, HTTP/S, MTQQ, Websocket"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service provides document analysis that detects and extracts printed text, handwriting, structured data, and tables from images and document scans?",
    "o": [
      "Amazon Comprehend",
      "Amazon Transcribe",
      "Amazon Textract",
      "Amazon Translate"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about semistructured data are correct? (Select THREE.)",
    "o": [
      "The data conforms to a rigid schema expected in relational databases.",
      "The data does not conform to a rigid schema.",
      "The data contains complex values, such as arrays and nested structures.",
      "The data is often associated with serialization formats, such as JSON."
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "How does the security analysis feature of Amazon Q help developers?",
    "o": [
      "It identifies security vulnerabilities in code.",
      "It identifies syntax errors in code.",
      "It identifies code duplication.",
      "It identifies performance bottlenecks."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary benefit of using Amazon Bedrock?",
    "o": [
      "You can use Amazon Bedrock to train custom machine learning models from scratch.",
      "Amazon Bedrock provides access to a wide range of pre-trained foundation models without the need to train them yourself.",
      "Amazon Bedrock offers a fully managed environment for deploying and scaling machine learning applications.",
      "Amazon Bedrock offers real-time data processing and analysis using serverless computing."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A company's system processes thousands of messages per day through Amazon Simple Queue Service (Amazon SQS), but they notice that a large number of messages repeatedly fail. Which action should they take to investigate and reprocess failed messages?",
    "o": [
      "Set up a FIFO queue.",
      "Change the message order priority to 1.",
      "Set up a delay queue.",
      "Configure a dead-letter queue."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which type of machine learning component is XGBoost?",
    "o": [
      "Program",
      "Algorithm",
      "Service",
      "Model"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "DNS Firewall, a feature of Amazon Route 53 Resolver, can be used to block resolution requests to resources. Which type of hosted zones, including virtual private cloud (VPC) endpoint names, can contain these resources?",
    "o": [
      "Private hosted zones (shared or local)",
      "Hidden hosted zones (shared or local)",
      "External hosted zones (shared or local)",
      "Secret hosted zones (shared or local)"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS Identity and Access Management (IAM) components are used as placeholders when the exact value of a resource or condition key is unknown when a policy is written?",
    "o": [
      "Policy conditions",
      "Policy variables",
      "Policy actions",
      "Policy tags"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS resources can AWS WAF deploy on? (Select THREE.)",
    "o": [
      "Application Load Balancer",
      "AWS AppSync",
      "Amazon Route 53",
      "Amazon CloudFront"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "With Amazon Route 53 Resolver DNS Firewall, users can filter and regulate DNS traffic for their virtual private cloud (VPC). Which type of traffic is protected?",
    "o": [
      "Inbound DNS requests",
      "Outbound DNS requests",
      "Outbound FTP requests",
      "Inbound FTP requests"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which vector stores can be used with Amazon Bedrock Knowledge Bases? (Select THREE.)",
    "o": [
      "Google BigQuery",
      "Pinecone",
      "MongoDB Atlas",
      "Amazon OpenSearch Serverless"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statements are true regarding the deletion of AWS Key Management Service (AWS KMS) keys? (Select TWO.)",
    "o": [
      "The key can be deleted immediately.",
      "A waiting period of 7–30 days exists between the deletion request and the actual deletion of the key.",
      "Any resources encrypted with the deleted key will still be accessible from the original account.",
      "Any resources encrypted with the deleted key will be unrecoverable."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which architectural approach can be used to store ALL data, including structured and unstructured, in a centralized repository, so that it can be categorized, catalogued, secured, and analyzed?",
    "o": [
      "Database",
      "Data lake",
      "Data mart",
      "Data warehouse"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which resources are components of an AWS Glue job? (Select THREE.)",
    "o": [
      "Data sources",
      "Data schema",
      "Transformation script",
      "Data targets"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service can provide database credentials and send them to an AWS Lambda function to connect and query the backend database service, Amazon RDS?",
    "o": [
      "AWS Shield",
      "Amazon Macie",
      "AWS Secrets Manager",
      "Amazon GuardDuty"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Triggers can start an AWS Glue job based on a schedule or an event, but not on demand.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is AWS Lambda?",
    "o": [
      "AWS Lambda is a compute service that lets you run code without provisioning or managing servers.",
      "AWS Lambda is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.",
      "AWS Lambda is a managed service that makes it easy to set up, operate, and scale a relational database in the cloud."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which Amazon SageMaker AI resource is used to conduct machine learning (ML) experiments for training and inference while accessing the SageMaker features and the AWS infrastructure?",
    "o": [
      "LLM model",
      "Endpoint",
      "Jupyter notebook",
      "Domain"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the significance of foundation models (FMs) in the field of machine learning and artificial intelligence?",
    "o": [
      "They are basic models used only for simple tasks, such as data sorting, and not suitable for complex AI applications.",
      "They are specialized models trained on narrow datasets for highly specific tasks in AI.",
      "They are large, deep-learning neural networks trained on massive datasets, used as a starting point by data scientists to develop ML models quickly and cost-effectively for a variety of general tasks.",
      "The term foundation model refers to the earliest form of machine learning models that are now outdated."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Identity and Access Management (IAM) instance profiles are automatically associated with IAM roles when managed through the AWS Command Line Interface (AWS CLI) or AWS API.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What can Amazon Quick use to display a collection of visualizations, tables, and other visual displays arranged and visible together?",
    "o": [
      "Display array",
      "Dashboard",
      "Visual collator",
      "Overview"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What is the underlying technology behind Amazon Athena?",
    "o": [
      "Apache Hive",
      "Apache Spark SQL",
      "Apache Impala",
      "Presto"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which type of images are preinstalled with TensorFlow in AWS Deep Learning Containers to deploy custom machine learning environments quickly?",
    "o": [
      "Fargate",
      "Snapshot",
      "Docker",
      "S3"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A security group was configured with a rule to allow HTTPS traffic to an instance. What will happen if an HTTP connection is attempted?",
    "o": [
      "The security group will allow the incoming connection but will deny the outgoing connection.",
      "Unless there is a rule explicitly allowing HTTP, the security group will deny the connection.",
      "The security group will allow the connection because HTTPS implies HTTP as well."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which statement best describes the function of a Traffic Mirroring session?",
    "o": [
      "It screens out problematic traffic before the traffic enters a network.",
      "It determines which external IPs are allowed to access content in a network.",
      "It establishes a relationship between a traffic mirror source and a traffic mirror target.",
      "It determines which traffic is copied from a traffic mirror source and sent to a traffic mirror target."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Chatbot conversation logs that are subject to the Children's Online Privacy Protection Act (COPPA) cannot be used.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which playgrounds are currently available on the Amazon Bedrock console? (Select THREE.)",
    "o": [
      "Chat/text playground",
      "Image playground",
      "Multi-modal playground",
      "Video playground"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which statement accurately describes the relationship between AWS IoT things and device shadows?",
    "o": [
      "Each AWS IoT thing has a single, unnamed device shadow by default.",
      "Multiple named device shadows can be created for each AWS IoT thing.",
      "Device shadows are only available for AWS IoT things that are online.",
      "Device shadows are separate from AWS IoT things and must be manually associated."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS Backup feature helps users protect their backups from deletion or changes to their lifecycle?",
    "o": [
      "Lifecycle policies",
      "Vault Lock",
      "Access policies",
      "Audit Manager"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which file sizes does Amazon Rekognition support? (Select TWO.)",
    "o": [
      "Amazon S3 objects up to 15 MB",
      "Image byte array up to 5 MB",
      "Amazon S3 objects up to 5 MB",
      "Image byte array up to 15 MB"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is an important consideration when implementing code generation solutions with Amazon Bedrock?",
    "o": [
      "Model selection based on use case",
      "Network bandwidth",
      "Storage capacity",
      "Hardware requirements"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "What is AWS Serverless Application Model (AWS SAM)? (Select THREE.)",
    "o": [
      "An extension of AWS CloudFormation",
      "A monitoring system for serverless applications",
      "An open source framework for building serverless applications",
      "A way to, with only a few lines per resource, define an application and model it by using YAML"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service coordinates and manages the delivery or sending of messages to subscribing endpoints or clients?",
    "o": [
      "Amazon Simple Notification Service (Amazon SNS)",
      "Amazon Simple Queue Service (Amazon SQS)",
      "AWS Lambda",
      "AWS Identity and Access Management (IAM)"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which component of Amazon Bedrock Guardrails helps filter out harmful content categories?",
    "o": [
      "Content filters",
      "Prompt templates",
      "Knowledge bases",
      "Model evaluation metrics"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What are the basic components of Amazon DynamoDB?",
    "o": [
      "Collection, document, field, and view",
      "Tables, primary key, foreign keys, and sequences",
      "Tables, items, and attributes"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is a best practice after an application has encrypted data with an AWS Key Management Service (AWS KMS) plaintext data key?",
    "o": [
      "Store the plaintext data key for future data encryption.",
      "Remove the plaintext and the encrypted data keys from memory as soon as possible.",
      "Remove the plaintext data key from memory as soon as possible.",
      "Share the plaintext data key with your team members."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS Managed Rules rule group provides protection against exploitation of a wide range of vulnerabilities generally applicable to web applications?",
    "o": [
      "Core rule set (CRS) managed rule group",
      "SQL database managed rule group",
      "Anonymous IP list managed rule group"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "When users create an AWS Glue job, they can choose the Spark script editor to upload their own script. Which type of files can they upload? (Select TWO.)",
    "o": [
      "HTML files",
      "Python script files",
      "JavaScript files",
      "Scala script files"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "When users connect an AWS Lambda function to a virtual private cloud (VPC), Lambda assigns the function to a Hyperplane ENI (elastic network interface) for each subnet in the function's VPC configuration.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which built-in data conversion formats does Amazon Data Firehose support? (Select TWO.)",
    "o": [
      "Apache HTTP logs",
      "Apache ORC",
      "Apache Hadoop",
      "Apache Parquet"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Multiple security groups can be associated with a resource. Which rules are used to determine whether to allow access?",
    "o": [
      "The security groups are queried in the order that they were attached.",
      "The rules from all attached security groups are aggregated to form a single set of rules.",
      "Only one security group can be associated with a resource.",
      "The most restrictive rule wins."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which metrics can be tracked in a scaling policy? (Select THREE.)",
    "o": [
      "Average CPU utilization",
      "Average network in",
      "Average network out",
      "Maximum memory usage"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS WAF evaluates the rules in a web access control list (web ACL), starting from the highest numeric priority setting.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "How does an Application Load Balancer work with AWS Fargate?",
    "o": [
      "It distributes traffic across Fargate tasks based on application-level protocols, such as HTTP and HTTPS.",
      "It distributes traffic across Fargate tasks based on network-level protocols, such as TCP and UDP.",
      "It automatically scales Fargate tasks based on load.",
      "It distributes traffic across Fargate tasks based on all protocols."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of AWS Identity and Access Management (IAM) policy requires a principal to be defined?",
    "o": [
      "Resource-based policies",
      "Identity-based policies",
      "Account-based policies",
      "Organization-based policies"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "AWS Step Functions offers two types of state machines, Standard and Express. Which statements are correct regarding state machine types? (Select TWO.)",
    "o": [
      "Standard workflows are ideal for long-running, durable, and auditable workflows.",
      "Express workflows can have a maximum duration of 6 hours.",
      "Express workflows are ideal for high-volume, event-processing workloads."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "How can foundation models be accessed using Amazon SageMaker AI JumpStart?",
    "o": [
      "Only through SageMaker Studio",
      "Only through the SageMaker SDK",
      "Only through the AWS Management Console",
      "Through SageMaker Studio, the SageMaker SDK, and the AWS Management Console"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which handling options are available in AWS WAF when a web request matches a rule criteria in a web access control list (web ACL)? (Select THREE.)",
    "o": [
      "Block",
      "Count",
      "Trace",
      "CAPTCHA"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which ways can be used to pass an input image for image moderation using Amazon Rekognition? (Select TWO.)",
    "o": [
      "Base64-encoded image bytes",
      "Reference to an image in Amazon S3",
      "Zip file",
      "Tar file"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A machine learning engineer needs to check the correct endpoint when making API requests to Amazon Bedrock. Which CLI reference should they consult?",
    "o": [
      "Amazon Bedrock CLI commands",
      "Amazon Bedrock Runtime CLI commands",
      "Agents for Amazon Bedrock CLI commands",
      "Agents for Amazon Bedrock Runtime CLI commands"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of Amazon Kendra?",
    "o": [
      "To streamline AWS infrastructure management",
      "To provide a highly accurate and streamlined enterprise search service powered by machine learning",
      "To enhance cloud storage options with advanced data retrieval features",
      "To provide real-time analytics and business intelligence insights"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "AWS Backup helps users create and manage data backups across AWS services. Which AWS storage service does AWS Backup support? (Select TWO.)",
    "o": [
      "AWS CodeCommit repositories",
      "Amazon Elastic Block Store (Amazon EBS) volumes",
      "Amazon Simple Queue Service (Amazon SQS) queues",
      "Amazon Elastic Compute Cloud (Amazon EC2) instances"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which command line interface in Amazon SageMaker AI Studio can be used to build a Dockerfile by using AWS CodeBuild?",
    "o": [
      "Jupyter notebook",
      "Image build",
      "AWS Serverless Application Model (AWS SAM)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Text detection is a capability of Amazon Rekognition, which can be used to detect and recognize text within an image or a video, such as street names, captions, product names, overlaid graphics, video subtitles, and vehicular license plates.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statements describe the primary purpose of large language model (LLM) agents? (Select TWO.)",
    "o": [
      "Extend the capabilities of standalone LLMs by connecting to external resources and tools.",
      "Provide a fixed sequence of actions for a given task, without adapting to user input.",
      "Enable flexible and adaptive sequences of actions based on user input and available resources.",
      "Replace the need for standalone LLMs by performing all tasks independently."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement regarding auto scaling and load balancing is true?",
    "o": [
      "An Auto Scaling group can use only one Availability Zone at a time.",
      "Auto Scaling groups must be used independently of load balancers.",
      "A load balancer will route traffic to all targets, no matter which Availability Zone the targets are in.",
      "Load balancers must use the same security group as the instances behind it."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about the query operation in Amazon DynamoDB are correct? (Select TWO.)",
    "o": [
      "In a query operation, users must provide the name and a value of the partition key. The sort key is optional.",
      "In a query operation, users must provide the name and a value of the partition key as well as the sort key.",
      "A filter expression cannot contain partition key or sort key attributes.",
      "A filter expression can contain partition key or sort key attributes."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statements regarding Amazon S3 buckets are true? (Select TWO.)",
    "o": [
      "Amazon S3 creates buckets in an AWS Region that the user specifies.",
      "S3 buckets exist only in a single Availability Zone.",
      "A bucket is a container for objects stored in Amazon S3.",
      "S3 buckets have public access by default."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the outcome if an AWS Identity and Access Management (IAM) user has conflicting ALLOW and DENY policies attached?",
    "o": [
      "The action will be allowed.",
      "The action will be denied.",
      "The administrator will be prompted to select a policy for the user."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What can users configure to keep traffic between their virtual private cloud (VPC) and AWS Secrets Manager within the AWS network?",
    "o": [
      "Internet gateway",
      "VPC endpoints",
      "Network Address Translation (NAT) gateway",
      "Egress-only internet gateway"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can be directly invoked by an Amazon CloudWatch alarm? (Select THREE.)",
    "o": [
      "Lambda functions",
      "Notifications to an SNS topic",
      "Stopping or starting EC2 instances",
      "Auto scaling actions"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Amazon Elastic Container Registry (Amazon ECR) is a Regional service that is designed to provide flexibility in how images are deployed.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about Amazon Redshift Spectrum are true? (Select THREE.)",
    "o": [
      "Redshift Spectrum resides on dedicated Amazon Redshift servers that are independent of a user's cluster.",
      "Redshift Spectrum uses massive parallelism to run very fast queries on large datasets.",
      "Redshift Spectrum helps to query and retrieve data from files in Amazon S3 without having to load the data into Amazon Redshift tables.",
      "Redshift Spectrum can query data from files in Amazon S3, only after the data is loaded into Amazon Redshift."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which AWS service is a serverless function orchestrator that helps sequence AWS Lambda functions and multiple other AWS services into business-critical applications?",
    "o": [
      "AWS Step Functions",
      "Amazon Simple Queue Service (Amazon SQS)",
      "AWS Lambda",
      "Amazon Route 53"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How can users configure custom error pages in Amazon CloudFront?",
    "o": [
      "Modify the CloudFront distribution's configuration file.",
      "Specify the error pages in the origin server's configuration.",
      "Upload HTML error pages to an Amazon S3 bucket and reference them in the CloudFront distribution settings.",
      "Custom error pages are not supported in CloudFront."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is 10.0.0.0/16 an example of?",
    "o": [
      "IP Address",
      "CIDR block",
      "Security group rule",
      "Instance ID"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which DNS record type is used to link an IPv6 address to a hostname?",
    "o": [
      "A",
      "CNAME",
      "MX",
      "AAAA"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the role of an index in Amazon Kendra?",
    "o": [
      "To manage user access and security settings",
      "To store data backups and recovery points",
      "To collect and analyze application logs and performance metrics",
      "To search through documents and websites using natural language"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Amazon Rekognition can use the RecognizeCelebrities API to detect individuals who are famous, noteworthy, or prominent.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What does AWS Transit Gateway deploy within virtual private cloud (VPC) subnets when attaching one or more VPC?",
    "o": [
      "Static IP address",
      "Route table",
      "Security group",
      "Elastic network interface"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What happens to the source data in Amazon S3 when queries are run in Amazon Athena?",
    "o": [
      "The data is modified by Athena.",
      "The data is not modified by Athena.",
      "A separate copy of the modified data is made and stored in Athena."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is the Suricata open source intrusion detection system (IDS) rule language, in the context of AWS Network Firewall?",
    "o": [
      "A language used to define stateless rule groups",
      "A language used to define stateful rule groups",
      "A language used to manage firewall settings",
      "A language used to manage VPC settings"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Amazon CloudWatch metrics are supported in AWS Site-to-Site VPN connections.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A Config rule can be configured to evaluate only resources that have been tagged with a specific key-value pair.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "In AWS Service Catalog, administrators can share portfolios with other AWS accounts and allow the administrators of those accounts to extend the portfolios by applying additional constraints.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "The Amazon S3 Event Notifications feature can be used to receive notifications when certain events occur in an S3 bucket. Which destination can Amazon S3 send event notification messages to? (Select THREE.)",
    "o": [
      "AWS Lambda function",
      "AWS Step Functions state machine",
      "Amazon SNS topic",
      "Amazon SQS queue"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is the best description of AWS Glue?",
    "o": [
      "A fast, flexible NoSQL database service",
      "A serverless, event-driven compute service",
      "A serverless data integration service",
      "An interactive query service"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service can be used with Amazon S3 Event Notifications to write rules that take actions when an event occurs in an S3 bucket?",
    "o": [
      "AWS Identity and Access Management (IAM)",
      "AWS Step Functions",
      "AWS Lambda",
      "Amazon EventBridge"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Security engineers want to invoke an AWS Lambda function directly when an Amazon CloudWatch alarm goes into the alarm state. Which AWS resource should they configure as a Lambda trigger?",
    "o": [
      "An Amazon CloudWatch log group",
      "An Amazon Simple Notification Service (Amazon SNS) topic",
      "An Amazon Simple Queue Service (Amazon SQS) queue",
      "An Amazon EventBridge event"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the data size limit for using an AWS Key Management Service (AWS KMS) key in an encryption operation?",
    "o": [
      "2 KB",
      "4 KB",
      "6 KB",
      "8 KB"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can be used to restrict access to specific Amazon EC2 instances? (Select TWO.)",
    "o": [
      "VPC route tables",
      "VPC peering",
      "Security groups",
      "Private subnets"
    ],
    "a": [
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is a private zone used for in Amazon Route 53?",
    "o": [
      "Route traffic in VPCs",
      "Route traffic to the internet",
      "Route traffic to an Amazon S3 bucket hosted inside a VPC",
      "Route traffic to a specific Amazon Elastic Block Store (Amazon EBS) volume without a host name"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which key-value pair can be used to describe an Amazon EC2 instance through custom content and metadata?",
    "o": [
      "EBS",
      "Definitions",
      "Policies",
      "Tags"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which service offers the DNS Firewall feature without requiring any additional setup?",
    "o": [
      "Amazon S3",
      "Amazon EC2",
      "Route 53 Resolver",
      "AWS Lambda"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which resource automates the creation, retention, and deletion of Amazon Elastic Block Store (Amazon EBS) snapshots and AMIs backed by Amazon EBS?",
    "o": [
      "Amazon Data Lifecycle Manager",
      "Amazon S3 Intelligent Tiering",
      "AWS Config",
      "AWS Systems Manager"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Which features does the Amazon Location SDK provide? (Select THREE.)",
    "o": [
      "Amazon Location client",
      "Authentication using Amazon Cognito",
      "GeoJSON conversion helpers",
      "Google map integration"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which components of AWS IoT SiteWise allow data collection and processing on local devices? (Select TWO.)",
    "o": [
      "AWS IoT SiteWise Monitor",
      "AWS IoT SiteWise Edge",
      "AWS IoT SiteWise Metrics",
      "AWS IoT SiteWise Modeling"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Windows and Linux Amazon EC2 instances have Free Tier eligible instance types.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which statement is the MOST accurate about Amazon Managed Grafana data source integration?",
    "o": [
      "It integrates only with AWS data sources such as Amazon CloudWatch and AWS X-Ray.",
      "It integrates with AWS data sources and includes a permission provisioning feature for adding supported AWS services as data sources.",
      "It does not integrate with any AWS data sources or third-party data sources.",
      "It integrates only with open source data sources and does not support AWS data sources."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statement best describes Amazon Data Firehose?",
    "o": [
      "An extract, transform, and load (ETL) service",
      "A serverless, event-driven compute service",
      "A serverless data integration service",
      "An interactive query service"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Any resource that users can declare in an AWS CloudFormation template can also be declared in an AWS Serverless Application Model (AWS SAM) template.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Lexicons provide additional control over how Amazon Polly pronounces words not common to the selected language.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS offering serves as a machine learning hub?",
    "o": [
      "Amazon Q Developer",
      "Amazon SageMaker AI JumpStart",
      "Amazon Bedrock",
      "AWS Trainium"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What happens to the results of an Amazon Athena query that is saved?",
    "o": [
      "The results are not saved.",
      "The results are saved to a common folder in an Amazon S3 bucket.",
      "The results are saved to a folder with the same name as the query.",
      "The results are displayed only onscreen."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "If an Amazon EC2 instance sends a request, the response traffic for that request is allowed to reach the instance regardless of the inbound security group rules. Why is the response allowed?",
    "o": [
      "Security groups are intelligent.",
      "Security groups are stateful.",
      "Security groups are uni-directional.",
      "Security groups are stateless."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which time-step element is included in the Markov Decision Process (MDP) used by Amazon SageMaker AI RL (reinforcement learning)?",
    "o": [
      "Computer Science, Neuroscience, Psychology",
      "Space, Time, Event Horizon, Observer",
      "X-axis, Y-axis, Z-axis, Time",
      "Environment, State, Action, Reward, Observation"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Aurora PostgreSQL can be used as a vector database to store and query text embeddings in an Amazon Bedrock knowledge base.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What happens to an Amazon Athena table and its data when a DROP statement is used on the table? (Select TWO.)",
    "o": [
      "The table definition stays intact.",
      "The table definition is removed.",
      "The underlying data is removed.",
      "The underlying data stays intact."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which attachment types are supported by AWS Transit Gateway? (Select THREE.)",
    "o": [
      "Connect",
      "VPC",
      "VPN",
      "Customer gateway"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of token contains claims about the identity of the authenticated user, such as name, email, and phone number?",
    "o": [
      "Access",
      "Security",
      "ID",
      "Refresh"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which service does a data lake, built on AWS, use as its primary storage solution?",
    "o": [
      "Amazon DynamoDB",
      "Amazon S3",
      "Amazon Redshift",
      "Amazon Elastic File System (Amazon EFS)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "When a user signs in to an app, Amazon Cognito can verify the login information. Which tokens does Amazon Cognito return to the authenticated user after login is successful? (Select THREE.)",
    "o": [
      "ID token",
      "Access token",
      "Refresh token",
      "Policy token"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS service, besides AWS Direct Connect, can be used to reach other AWS services supported by AWS PrivateLink from an on-premises network?",
    "o": [
      "AWS Site-to-Site VPN",
      "Amazon Virtual Private Cloud (Amazon VPC)",
      "AWS Verified Access",
      "You must use AWS Direct Connect"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Suspicious activity is detected on an Amazon EC2 instance, and security engineers want to isolate the resource. Which action should they take? (Select TWO.)",
    "o": [
      "Terminate the EC2 instance.",
      "Remove associated AWS Identity and Access Management (IAM) instance profiles.",
      "Change the root password.",
      "Apply any existing isolated security groups."
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "The AWS feature, VPC Flow Logs, captures information about the IP traffic going to and from a virtual private cloud (VPC). Where is the IP traffic going to and from?",
    "o": [
      "The internet",
      "AWS accounts",
      "AWS services",
      "Network interfaces"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which capability of regular expressions is the primary reason that data engineers use them.",
    "o": [
      "They can match and replace complex patterns in text strings.",
      "They can express themselves on a regular basis.",
      "They can encrypt data in a large language model.",
      "They can make basic code look complex."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which permissions can be granted to a principal in AWS Lake Formation? (Select TWO.)",
    "o": [
      "Select",
      "Update",
      "Archive",
      "Super"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Object replication can be configured only between Amazon S3 buckets in the same Region.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "An unsupervised learning algorithm requires a training dataset that has both features and labels.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Which AWS service consists of virtual servers that provide scalable computing capacity?",
    "o": [
      "Amazon S3",
      "Amazon RDS",
      "Amazon EC2",
      "Amazon Route 53"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which functions can an Amazon Managed Service for Apache Flink application perform?",
    "o": [
      "Author and run powerful SQL code against streaming sources.",
      "Use Java, Scala, or SQL to process and analyze streaming data.",
      "Ingest streaming data to Amazon S3 or Amazon Redshift.",
      "Capture, process, and store data streams at any scale."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which action is recommended to create effective prompts for Amazon Bedrock large language models (LLMs)?",
    "o": [
      "Use negative phrasing and absolute terms like \"never\" or \"always\".",
      "Provide clear and concise instructions to the LLM.",
      "Include irrelevant or misleading information in the prompt.",
      "Use overly complex or technical language."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which targets for an Application Load Balancer are valid? (Select THREE.)",
    "o": [
      "Instance",
      "Lambda function",
      "Database",
      "IP address"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which definition BEST describes an AWS IoT Greengrass component?",
    "o": [
      "A pre-built software module that extends the functionality of edge devices",
      "A custom application developed using AWS Lambda functions or Docker containers",
      "A representation of a specific device or logical entity in the AWS IoT registry",
      "The AWS IoT Greengrass Core software running on a Greengrass core device"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about an AWS Glue job are correct? (Select THREE.)",
    "o": [
      "An AWS Glue job runs extract, transform, and load (ETL) scripts.",
      "The code generator in AWS Glue can automatically create an Apache Spark API (PySpark) script for a job.",
      "AWS Glue cannot automatically create an Apache Spark API (PySpark) script for a job.",
      "Runtime metrics, such as completion status, duration, and start time, are provided for monitoring job runs."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Comprehend feature helps identify sensitive data, such as credit card numbers and SSNs?",
    "o": [
      "Entity recognition",
      "PII detection",
      "Key phrase extraction",
      "Sentiment analysis"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "In applications, users can retrieve secrets from AWS Secrets Manager by calling “GetSecretValue” in any of the AWS software development kits (SDKs).",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which Amazon SageMaker AI Python class takes a framework model and converts it into a deployable model?",
    "o": [
      "ModelBuilder",
      "ModelCreator",
      "ModelConverter",
      "ModelDeployer"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of fine-tuning a pre-trained LLM, such as the ones available on Amazon SageMaker AI?",
    "o": [
      "Improve the model's performance on a specific task or domain.",
      "Reduce the model's size and make it more efficient.",
      "Train the model from scratch on a new dataset.",
      "Convert the model to a different architecture or framework."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Secrets Manager can call an AWS Lambda function to initiate the rotation of a secret. The rotation function can then automatically use Secure Socket Layer (SSL) or Transport Layer Security (TLS) to connect to an Amazon Relational Database Service (Amazon RDS) database.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is an Amazon S3 bucket?",
    "o": [
      "An optional organization folder (objects can also be stored at the root of an Amazon S3 infrastructure)",
      "A container for objects stored in Amazon S3 (every object is contained in a bucket)",
      "An alias for a folder within Amazon S3"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which option provides several high-level abstractions for working with Amazon SageMaker AI, including transformers, estimators, and predictors?",
    "o": [
      "SageMaker JupyterLab",
      "SageMaker Studio",
      "SageMaker Canvas",
      "SageMaker Python SDK"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement accurately describes cloud computing?",
    "o": [
      "Hardware is kept in a location other than a company's building.",
      "Code runs in several places at the same time.",
      "IT resources are delivered over the internet, on demand, with pay-as-you-go pricing."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Anomalies can manifest themselves as unexpected spikes in time-series data, breaks in periodicity, or unclassifiable data points.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which audio stream formats does Amazon Polly support? (Select THREE.)",
    "o": [
      "MP3",
      "WAV",
      "PCM",
      "Vorbis"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the maximum number of characters that can be used to name a customer managed policy?",
    "o": [
      "32",
      "128",
      "60",
      "100"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statements accurately describe AmazonKendraRetriever in LangChain? (Select TWO.)",
    "o": [
      "Users can query an Amazon Kendra index and retrieve relevant documents based on a natural language query.",
      "Users must manually filter and rank the search results returned by Amazon Kendra.",
      "Users can combine AmazonKendraRetriever with other LangChain components to build question-answering applications.",
      "Users can perform only keyword-based searches, not semantic searches, on an Amazon Kendra index."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Comprehend is a managed service.",
    "o": [
      "FALSE",
      "TRUE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which document types can Amazon Textract asynchronously process? (Select TWO.)",
    "o": [
      "JPEG",
      "PDF",
      "PNG",
      "TIFF"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Real-time inference is ideal for inference workloads where users have real-time, interactive, low-latency requirements. What can users get, which can be used for inference, when they deploy their model to Amazon SageMaker AI hosting services?",
    "o": [
      "An endpoint",
      "A model",
      "An algorithm",
      "A host"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "A rate-based rule in AWS WAF can put a temporary block on requests from an IP address that is sending excessive requests. The limit is set as the number of requests per 10-minute time span.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A company's data engineers have multiple subnets in an Availability Zone in their virtual private cloud (VPC). Where would they create a mount target when deploying a new Amazon Elastic File System (Amazon EFS) file system?",
    "o": [
      "In one of the subnets",
      "In all of the subnets",
      "In all public subnets",
      "In all private subnets"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which type of API method is used to start the training of a TensorFlow model through the estimator?",
    "o": [
      "deploy()",
      "fit()",
      "train()",
      "predict()"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which AWS service uses machine learning models to convert speech-to-text?",
    "o": [
      "Amazon Polly",
      "Amazon Comprehend",
      "Amazon Transcribe",
      "Amazon Textract"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Amazon Bedrock Knowledge Bases supports creating a data source by crawling any HTML webpage found on the internet.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Which algorithms can Amazon SageMaker AI use to generate models?",
    "o": [
      "Linear regression, logistic regression, and k-means clustering",
      "Apache MXNet, TensorFlow, and Chainer",
      "PyTorch, Gluon, and Keras",
      "All of the above"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is a valid value for the IAM JSON policy element, Effect? (Select TWO.)",
    "o": [
      "TRUE",
      "Allow",
      "Deny",
      "FALSE"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which resource helps to securely stream media from connected devices to AWS for storage, analytics, machine learning, playback, and other processing?",
    "o": [
      "Amazon DynamoDB Streams",
      "Amazon Kinesis Video Streams",
      "Internet of Things (IoT)",
      "AWS Lambda streaming analytics"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "AWS Step Functions can create long-running, automated workflows for applications that require human interaction.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which actions can be performed on documents in Amazon Comprehend? (Select THREE.)",
    "o": [
      "Detect dominant language.",
      "Determine sentiment.",
      "Analyze syntax.",
      "Translate language."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which AWS service can be used to host foundation models that can be prompted from LangChain?",
    "o": [
      "Amazon Kendra",
      "Amazon Artifact",
      "Amazon SageMaker AI",
      "Amazon DynamoDB"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about secondary indexes are correct? (Select THREE.)",
    "o": [
      "A local secondary index is an index that has the same partition key as the base table, but a different sort key.",
      "A local secondary index is an index that has the same partition and sort key as the base table.",
      "A global secondary index is an index with a partition key and a sort key that can be different from those on the base table.",
      "A global secondary index has its own provisioned throughput settings for read and write capacity."
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Amazon S3 Lifecycle transition actions delete expired objects on behalf of the user.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which data target options are available in an AWS Glue job? (Select THREE.)",
    "o": [
      "AWS Glue Data Catalog",
      "Amazon Athena",
      "Amazon S3 buckets",
      "A connector"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which Amazon EMR node type cannot store data?",
    "o": [
      "Task node",
      "Core node",
      "Secondary node"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Customers can use three types of AWS Config rules: AWS managed, marketplace managed, and customer managed.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What is the correct response to a \"ProvisionedThroughputExceededException\" error? (Select TWO.)",
    "o": [
      "Use the Config parameter to retry the operation up to five times.",
      "Document the use case and enter a support case to request a limit increase.",
      "Use the equivalent asynchronous API call.",
      "Ask the Account Manager to enter a product feature request."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS service is used to secure permissions on data lake resources?",
    "o": [
      "AWS Glue",
      "AWS Lake Formation",
      "AWS Identity and Access Management",
      "Amazon Cognito"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which service is an AWS managed container image registry that is secure, scalable, and reliable?",
    "o": [
      "Amazon Relational Database Service (Amazon RDS)",
      "Amazon Elastic Container Registry (Amazon ECR)",
      "Amazon Identity and Access Management (IAM)",
      "Amazon Elastic Container Service (Amazon ECS)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which AWS pricing model offers lower prices on compute and machine learning across any AWS Region?",
    "o": [
      "Pay-as-you-go",
      "On-demand",
      "Dedicated hosts",
      "Savings Plans"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which features does Amazon Data Firehose offer? (Select TWO.)",
    "o": [
      "Dynamic partitioning of streaming data",
      "A built-in query editor",
      "Conversion of data format to Apache Parquet",
      "Secure user authentication"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which type of deployment model is used in cloud computing? (Select THREE.)",
    "o": [
      "Cloud",
      "Partner",
      "Hybrid",
      "On premises"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is the primary purpose of Amazon Bedrock Agents?",
    "o": [
      "Store data on AWS.",
      "Build AI-powered assistants that can perform complex tasks.",
      "Manage AWS infrastructure.",
      "Train machine learning models."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement about the Amazon S3 data consistency model is correct?",
    "o": [
      "Amazon S3 provides read-after-write consistency for PUTS of new objects in an S3 bucket in all AWS Regions.",
      "Amazon S3 provides strong read-after-write consistency for PUT and DELETE operations in all AWS Regions.",
      "Amazon S3 offers eventual consistency for overwrite PUTS and DELETES in all AWS Regions."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Secrets Manager supports automatic replication of secrets to multiple Availability Zones (AZs) in an AWS Region, but not replication to multiple AWS Regions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What does Amazon Q Developer do?",
    "o": [
      "Provides a machine learning infrastructure",
      "Serves as a machine learning hub",
      "Provides AI-powered coding assistance and software development support",
      "Provides an accessible API for foundation models"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "EC2 Instance Connect can help users connect to an instance. What are the two components of the connection?",
    "o": [
      "Linux/RDP",
      "Linux/SSH",
      "Windows/RDP",
      "Windows/SSH"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "How many Availability Zones, at least, make up an AWS Region?",
    "o": [
      "One",
      "Two",
      "Three",
      "Ten"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the purpose of agents in LangChain?",
    "o": [
      "To connect language models with external data sources",
      "To compose and customize existing chains for complex applications",
      "To format queries for language models",
      "To store and retrieve information from vector databases"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which resources no longer need to be provisioned when using AWS Lambda?",
    "o": [
      "Servers",
      "Databases",
      "Security policies"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "In AWS Key Management Service (AWS KMS), a symmetric encryption key represents a 256-bit encryption key that never leaves AWS KMS unencrypted.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What can users do with AWS Amplify libraries? (Select TWO.)",
    "o": [
      "Add offline data.",
      "Add multi-factor authentication.",
      "Configure a user pool.",
      "Configure cloud services."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which capabilities does AWS IoT TwinMaker provide? (Select TWO.)",
    "o": [
      "Model devices, equipment, spaces, and processes in a physical location.",
      "Automatically deploy IoT sensors and cameras in industrial environments.",
      "Connect digital twin models to data sources such as sensors and cameras.",
      "Provide a user interface for users to interact with digital twin data."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "The AWS Management Console is recommended for uploading files larger than 160 GB to Amazon S3.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which type of content can be tested by using an Amazon Bedrock playground?",
    "o": [
      "Text only",
      "Images only",
      "Both text and images",
      "Neither text nor images"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service is fully managed and provides an AWS resource inventory, configuration history, and configuration change notifications to help improve security and governance?",
    "o": [
      "AWS Config",
      "AWS GovCloud",
      "AWS AppConfig",
      "AWS Identity and Access Management (IAM)"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is the purpose of a private subnet in an AWS architecture?",
    "o": [
      "To directly access the internet",
      "To prevent direct access from the internet for enhanced security",
      "To connect to the database server only",
      "To provide public IP addresses for resources"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "While preparing a buildspec.YAML file, developers realize that they want to run integration tests from their build in a database within a virtual private cloud (VPC) on a private subnet. Which action should they take to allow this?",
    "o": [
      "Add the VPC ID, subnet, and security group ID to the AWS CodeBuild project configuration.",
      "Add the VPC ID, subnet, and security group ID to the codespec.YAML file.",
      "Add the AWS CodeBuild project ARN to the VPC security group."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Rotating a secret for AWS Secrets Manager, a rotation AWS Lambda function does the work. What are the steps taken to rotate a secret?",
    "o": [
      "Create secret, set secret, and finish secret.",
      "Create secret, set secret, and test secret.",
      "Create secret, set secret, test secret, and finish secret.",
      "Create secret, set secret, retrieve secret, and test secret."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is the best description of an AWS Transit Gateway route table?",
    "o": [
      "A collection of rules used to control traffic routing between VPCs and on-premises networks",
      "A set of policies that determine how traffic flows within a VPC",
      "A configuration that enables a VPN connection between an on-premises network and AWS",
      "A mechanism used to control traffic routing between different attachments connected to a transit gateway"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which tasks are required to deploy AWS Config? (Select THREE.)",
    "o": [
      "Specify an Amazon S3 bucket to receive configuration information.",
      "Specify the resource types to record.",
      "Choose at least one managed rule to start evaluating compliance.",
      "Define which role, linked to AWS Identity and Access Management (IAM), AWS Config should use."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which resource is a collection of queries and code that can be attached to an Amazon EMR cluster?",
    "o": [
      "Query editor",
      "Git repository",
      "EMR notebook",
      "AWS CodeCommit"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are two ways that developers can get started experimenting and developing large language models (LLMs)? (Select TWO.)",
    "o": [
      "Amazon Lex",
      "Amazon SageMaker AI Jumpstart",
      "Amazon Bedrock",
      "AWS Marketplace"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS services that are integrated with AWS Key Management Service (AWS KMS) use only symmetric encryption keys to encrypt data.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of endpoints provide reliable connectivity to Amazon S3 and Amazon DynamoDB without requiring an internet gateway or a NAT device for the virtual private cloud (VPC)?",
    "o": [
      "Interface VPC endpoints",
      "AWS PrivateLink endpoints",
      "Gateway VPC endpoints",
      "Gateway load balancer endpoints"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is used to uniquely identify AWS resources?",
    "o": [
      "URL",
      "ARN",
      "Region",
      "Account"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of Retrieval Augmented Generation (RAG) in natural language processing?",
    "o": [
      "Generate text from scratch without any external references.",
      "Retrieve relevant information from a large dataset.",
      "Augment existing text with additional details or context.",
      "Identify grammatical errors in written passages."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What does a routing table entry for a peered virtual private cloud (VPC) contain on AWS?",
    "o": [
      "The IP address of the peered VPC",
      "The ID of the peered VPC",
      "The CIDR block of the peered VPC",
      "The security group of the peered VPC"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which AWS Glue component acts as a central metadata repository?",
    "o": [
      "AWS Glue job",
      "AWS Glue crawler",
      "AWS Glue Studio",
      "AWS Glue Data Catalog"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A customer has two m5.xlarge Amazon EC2 instances, each with 40 GB of storage attached. One instance is running while the other is stopped. Which statement is true?",
    "o": [
      "The customer will be charged for the one running instance and for 40 GB of storage.",
      "The customer will be charged for the one running instance and for 80 GB of storage.",
      "The customer will be charged for the two instances and for 80 GB of storage."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon RDS Proxy is recommended for AWS Lambda functions that make frequent, short database connections.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which AWS service provides resizable compute capacity in the cloud, designed to help developers with web-scale computing?",
    "o": [
      "Amazon Elastic Compute Cloud (Amazon EC2)",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon SageMaker AI"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which item is used to organize metadata tables in AWS Glue?",
    "o": [
      "JSON",
      "XML",
      "A container",
      "A database"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS Glue component connects to a data store, progresses through a prioritized list of classifiers to extract the schema of the data and other statistics, and then populates the AWS Glue Data Catalog with this metadata?",
    "o": [
      "Crawler",
      "Database",
      "Table",
      "Schema"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which machine learning algorithm is best suited to solve anomaly detection problems?",
    "o": [
      "BlazingText",
      "Random Cut Forest (RCF)",
      "XGBoost",
      "K-Nearest-Neighbors (K-NN)"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Athena supports the ingestion of .csv files.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the MOST significant benefit of using AWS IoT TwinMaker for industrial operations?",
    "o": [
      "Reduce the need for physical sensors and cameras in industrial environments.",
      "Automate the deployment and management of IoT devices and applications.",
      "Drive business outcomes by optimizing operations using digital twin insights.",
      "Provide a solution for developing and testing industrial automation software."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Identity and Access Management (IAM) policies can be written in JSON, YAML, or using the visual editor.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which optimized integration pattern for AWS Step Functions is supported by both Standard and Express workflows?",
    "o": [
      "Request a response.",
      "Run a job (.sync).",
      "Wait for a callback with a task token (.waitForTaskToken).",
      "Use AWS SDK integrations."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "How does AWS Lambda scale in response to incoming requests?",
    "o": [
      "Lambda scales based on the amount of memory provisioned at the time the function was created.",
      "The AWS Auto Scaling service can be used to configure policies to automatically scale Lambda.",
      "Lambda manages the infrastructure that runs code, and scales automatically in response to incoming requests."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What is the purpose of the cache invalidation feature in Amazon CloudFront?",
    "o": [
      "Automatically refresh the cache for all objects in the distribution.",
      "Remove specific objects from the cache before their expiration time.",
      "Prevent caching of any objects in the distribution.",
      "Cache invalidation is not supported in CloudFront."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "With AWS WAF, web requests can be filtered based on IP addresses, HTTP headers, HTTP body, or URI strings.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which types of information can be found in the AWS Glue Data Catalog? (Select THREE.)",
    "o": [
      "Job definitions",
      "Table definitions",
      "Table data",
      "Table schemas"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is LangChain primarily designed for, in the context of generating prompts for large language models (LLMs)?",
    "o": [
      "Generating synthetic data for training LLMs",
      "Optimizing hyperparameters for LLMs",
      "Preprocessing textual data for LLMs",
      "Creating coherent and contextually relevant prompts for LLMs"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Bedrock agent interaction distinguishes it from a regular foundation model (FM) interaction?",
    "o": [
      "An agent generates only text responses.",
      "An agent can handle only single API calls.",
      "An agent can invoke multiple API calls and follow business logic.",
      "An agent works offline only."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service can track the use of AWS Key Management Service (AWS KMS) keys for auditing, regulatory, and compliance needs?",
    "o": [
      "Amazon Redshift",
      "Amazon S3",
      "AWS CloudTrail",
      "Amazon EC2"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which AWS services can be used to monitor the Amazon Q Developer activity of a user? (Select TWO.)",
    "o": [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "AWS X-Ray",
      "Amazon Bedrock"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Bedrock Guardrails feature helps protect personally identifiable information (PII)?",
    "o": [
      "Content filters",
      "Grounding",
      "Sensitive information filters",
      "Contextual embeddings"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Amazon Textract goes beyond simple optical character recognition (OCR) by extracting relationships, structure, and text from documents.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "An AWS Glue crawler can crawl multiple data stores in a single run.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What is an Amazon Kinesis data stream a set of?",
    "o": [
      "Containers",
      "Clusters",
      "Databases",
      "Shards"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "What are some benefits of Amazon DynamoDB Streams? (Select THREE.)",
    "o": [
      "DynamoDB Streams captures a time-ordered sequence of item-level modifications in a DynamoDB table.",
      "DynamoDB Streams records are durably stored for up to 24 hours.",
      "DynamoDB Streams records are durably stored in an S3 bucket.",
      "Applications can view the data items as they appeared before and after they were modified, in near real time."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What can connect a user to an Amazon EC2 Linux instance through an SSH client?",
    "o": [
      "Instance ID",
      "Public IP address",
      "Metadata"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statement best describes how AWS Service Catalog uses AWS CloudFormation templates?",
    "o": [
      "With Service Catalog, users can create and manage CloudFormation templates within an AWS account.",
      "Service Catalog uses CloudFormation templates to define and provision products and portfolios as deployable resources.",
      "Service Catalog integrates with CloudFormation to provide a web-based interface for manually provisioning AWS resources.",
      "Service Catalog monitors and logs changes made to CloudFormation templates and resources within an AWS account."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "A company's data architects designed their database schema to make the most common and important database queries as fast and as inexpensive as possible. Which AWS service is best suited to achieve their goal?",
    "o": [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon Neptune"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which aspects of speech can Speech Synthesis Markup Language (SSML) be used to control through Amazon Polly? (Select THREE.)",
    "o": [
      "Pronunciation",
      "Volume",
      "Dialect",
      "Speech rate"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statement accurately describes how virtual private cloud (VPC) endpoints can be used to secure access to Amazon S3 buckets?",
    "o": [
      "VPC endpoints provide an additional layer of encryption for data stored in S3 buckets.",
      "With VPC endpoints, resources within a VPC can access S3 buckets without traversing the public internet.",
      "With VPC endpoints, users can host static websites directly from S3 buckets within a VPC.",
      "VPC endpoints facilitate cross-Region replication of S3 bucket data within the same VPC."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A virtual private cloud (VPC) peering connection can be established only between two VPCs.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statement best describes Amazon OpenSearch Service?",
    "o": [
      "An extract, transform, and load (ETL) service",
      "An open-source, distributed search and analytics suite",
      "A serverless data streaming service",
      "A data storage and archival service"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is true about Amazon EC2 pricing?",
    "o": [
      "All storage attached to an instance is included in the hourly instance price.",
      "When an instance is stopped, charges for the instance stop but any attached Amazon EBS storage continues to be billed.",
      "All instances are charged their hourly rate whether they are running or stopped.",
      "A stopped instance is still charged, but at a lower rate."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "When an Amazon EMR cluster is terminated, the attached notebook is also terminated.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is the default storage retention period for Amazon CloudWatch logs?",
    "o": [
      "7 days",
      "30 days",
      "Indefinitely",
      "1 day"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What are characteristics of RESTful APIs, created by Amazon API Gateway? (Select THREE.)",
    "o": [
      "Are HTTP-based",
      "Enable stateless client-server communication",
      "Implement standard HTTP methods such as GET, POST, PUT, PATCH, and DELETE",
      "Route incoming messages based on message content"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "How does AWS ensure the privacy and security of Amazon SageMaker AI user content?",
    "o": [
      "AWS accesses content regularly for improvements.",
      "Content is stored in shared spaces for easy access.",
      "Users maintain ownership, and AWS does not access content without consent.",
      "All content is made public for transparency."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "After a large language model (LLM) is trained, it must be fine-tuned.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is an example of an Amazon EC2 instance type?",
    "o": [
      "m5.large",
      "ARM 64.00",
      "web_server",
      "Bucket"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers want to update the total orders in their e-store application whenever they receive a new or cancelled customer order in an Amazon DynamoDB table. Which DynamoDB feature can help?",
    "o": [
      "DynamoDB Secondary Index",
      "DynamoDB Streams",
      "DynamoDB Global Table",
      "DynamoDB Accelerator"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What is the purpose of the unique alias assigned to each data stream in AWS IoT SiteWise?",
    "o": [
      "Enable batch processing of SOME data streams from multiple sources.",
      "Associate data streams with specific asset properties in the asset model.",
      "Identify the data source and organize data streams based on their origin.",
      "Automatically aggregate and analyze SOME data from different data streams."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service, integrated with AWS WAF, can centrally define and manage rules across all the web applications a user wants to protect?",
    "o": [
      "Amazon CloudWatch",
      "AWS Firewall Manager",
      "Amazon GuardDuty",
      "Amazon Inspector"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which file types are supported data sources for Amazon EMR? (Select THREE.)",
    "o": [
      ".csv",
      ".xlsx",
      ".docx",
      ".parquet"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Amazon Q Developer can generate inline suggestions for AWS services by using the services' own coding environments.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "NAT gateways allow instances in a private subnet to connect to the internet.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "An inference component is an Amazon SageMaker AI hosting object that can be use to deploy a model to an endpoint.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the purpose of numbering the rules for a network access control list (network ACL)?",
    "o": [
      "It assigns a weight to the rule. The higher the number the more importance it is given.",
      "It serves as a reference point so that the rule can be reused in another network ACL.",
      "It serves no purpose.",
      "The network ACL evaluates the rules in order based on the number associated with each rule."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Virtual private clouds (VPCs) can be peered across AWS Regions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Reinforcement learning (RL) is a type of unsupervised learning algorithm.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which user profile information is supported by Amazon Cognito identity? (Select THREE.)",
    "o": [
      "User name",
      "Phone number",
      "SSN or valid government ID",
      "Address"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which statements about AWS Secrets Manager are true? (Select THREE.)",
    "o": [
      "Secrets Manager encrypts secrets at rest by using AWS Key Management Service (AWS KMS) encryption keys.",
      "Users can rotate secrets on a schedule, or on demand, in Secrets Manager.",
      "Secrets Manager writes or caches a secret to persistent storage.",
      "When users retrieve a secret, Secrets Manager decrypts the secret."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A developer is building an application that needs to interact with multiple large language models (LLMs) on Amazon Bedrock. Which approaches should the developer consider for prompting the LLMs? (Select TWO.)",
    "o": [
      "Using the Amazon Bedrock Runtime client to invoke different LLMs with custom prompts",
      "Manually uploading prompts and data to each LLM's training environment",
      "Using the Amazon Bedrock playgrounds to test and interact with various LLMs",
      "Deploying a separate instance of each LLM and managing prompts individually"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "EC2 Instance Connect requires a user-created and downloaded SSH key.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which AWS service provides remote management capabilities to update files on Amazon EC2 instances?",
    "o": [
      "AWS CloudFormation",
      "AWS Systems Manager",
      "AWS CodeDeploy",
      "AWS Cloud9"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What happens when an Amazon Simple Notification Service (Amazon SNS) topic fails to deliver a message to a subscriber? (Select TWO.)",
    "o": [
      "Amazon SNS applies jittering to delivery retries. The number of attempts depends on the subscription protocol.",
      "Users can set up a retry/delivery policy for all protocols.",
      "Users can set up a dead-letter queue to target messages that fail to be delivered."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which method is used to determine the expected property values when drift detection runs in AWS CloudFormation?",
    "o": [
      "Users must provide the values when they invoke drift detection.",
      "CloudFormation looks at all the resources and shows drift on any that do not match the average values.",
      "CloudFormation uses the parameters found in the template used to deploy the resources.",
      "CloudFormation uses a database of best practice values."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which API call would be used to query an Amazon SageMaker AI inference endpoint to get a prediction by using AWS Lambda?",
    "o": [
      "PredictNow",
      "InvokeEndpoint",
      "InvokeInference",
      "GetEndpoint"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which Amazon Transcribe API can be called to determine the status of a recently submitted transcription job?",
    "o": [
      "ListStatus",
      "ListTranscriptionJobs",
      "GetTranscriptionJob",
      "GetJobStatus"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which label types are used in Amazon Rekognition? (Select THREE.)",
    "o": [
      "Object",
      "Action",
      "Concept",
      "Deleted items"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which scenarios are ideal for connecting an AWS Lambda function to an Amazon RDS database? (Select TWO.)",
    "o": [
      "Batch processing of large datasets stored in Amazon S3",
      "Real-time data processing triggered by Amazon RDS events",
      "Building highly available and scalable web applications",
      "Long-running compute jobs with high CPU and memory requirements"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which AWS service uses natural language processing to answer business questions quickly through Amazon Quick?",
    "o": [
      "Amazon SageMaker AI",
      "Amazon Q in Quick",
      "Amazon EC2",
      "Amazon S3"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Bedrock foundation model (FM) is most effective at capturing semantic relationships between words, understanding contextual word meanings, and encoding this semantic information into a numerical format?",
    "o": [
      "Amazon Textract",
      "Amazon Titan Text Embeddings V2",
      "Amazon Nova Micro",
      "Anthropic"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A developer would like to set up a simple, low-cost, static website that delivers HTML, JavaScript, images, video, and other files to visitors. Which action should the developer take?",
    "o": [
      "Create an Amazon S3 bucket, and then enable static website hosting.",
      "Set up an Amazon EC2 instance, and then install WordPress on the instance.",
      "Use Amazon Lightsail to launch and manage a web server.",
      "Launch AWS Elastic Beanstalk to configure a web application."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Who should use AWS Service Catalog?",
    "o": [
      "Organizations",
      "IT teams",
      "Managed service providers",
      "All of the above"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service can rotate, manage, and retrieve database credentials and API keys throughout their lifecycle?",
    "o": [
      "AWS Key Management Service",
      "AWS Secrets Manager",
      "Amazon API Gateway",
      "AWS Config"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which fully managed AWS service helps build, train, and deploy machine learning (ML) models?",
    "o": [
      "Amazon SageMaker AI",
      "Amazon Polly",
      "Amazon Comprehend",
      "Amazon Translate"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "In AWS Secrets Manager, users can set up the automatic rotation of secrets. Which statements about automatic secrets rotation are true? (Select TWO.)",
    "o": [
      "To turn on automatic rotation, users need administrator permissions.",
      "To turn on automatic rotation, users do not need administrator permissions.",
      "Applications that retrieve a secret from Secrets Manager automatically get new credentials after rotation.",
      "Applications that retrieve a secret from Secrets Manager do not automatically get new credentials after rotation."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Secrets Manager provides complete rotation templates for Amazon Relational Database Service (Amazon RDS), Amazon DocumentDB, and Amazon Redshift secrets.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "In Amazon Kinesis Data Streams, only one application can consume data from a stream at any one time.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which service helps users codify their infrastructure and treat their infrastructure as code?",
    "o": [
      "AWS CodePipeline",
      "AWS CloudFormation",
      "Amazon CodeCatalyst",
      "AWS Cloud9"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which statement is true regarding the use of datasets for training models with Amazon SageMaker AI?",
    "o": [
      "The datasets you can use have a strict size limit.",
      "The datasets you can use have no fixed size limit.",
      "Only small datasets can be used.",
      "Datasets larger than 10 GB are not allowed."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "What represents a physical device, equipment, or process in an industrial operation in AWS IoT SiteWise?",
    "o": [
      "A cloud service for storing and organizing industrial data",
      "A software component that collects and processes data from industrial equipment",
      "A web application for monitoring and analyzing industrial data in real time",
      "An asset"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which methods can an engineer use to ingest data into AWS IoT SiteWise? (Select THREE.)",
    "o": [
      "Use an IoT SiteWise Edge gateway to read data directly from on-site devices by using protocols such as OPC-UA.",
      "Use the AWS IoT SiteWise API to upload data from any other source, either through streaming or batch operations.",
      "Employ the AWS IoT Core rules engine to direct MQTT messages from connected devices to AWS IoT SiteWise.",
      "Configure AWS IoT Events actions to send data to AWS IoT SiteWise when specific events occur."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What will be the outcome of an AWS Identity and Access Management (IAM) policy with \"multiple\" AND \"conditions\" specified if one of the conditions returns FALSE?",
    "o": [
      "The action will be allowed because the other conditions returned TRUE.",
      "The action will be denied because one condition returned FALSE."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which data sources are supported for an AWS Glue crawler? (Select THREE.)",
    "o": [
      "Amazon Kinesis Data Stream",
      "Amazon S3",
      "Amazon Aurora",
      "Amazon Redshift"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Amazon DynamoDB is a fully managed NoSQL database service that provides seamless scalability. What is the best description of DynamoDB performance? (Select TWO.)",
    "o": [
      "On-demand",
      "Fast",
      "Predictable",
      "Schemaless"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which Amazon Bedrock mode is best to generate a one-time code response?",
    "o": [
      "Compare mode",
      "Single prompt mode",
      "Multi-model mode",
      "Conversation mode"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Who owns an uploaded object if S3 access control lists (ACLs) are disabled on an Amazon S3 bucket?",
    "o": [
      "The bucket owner",
      "The object writer",
      "Neither"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of embeddings in natural language processing?",
    "o": [
      "Convert text data into a dense numerical representation for efficient processing.",
      "Perform sentiment analysis on text data.",
      "Translate text from one language to another.",
      "Generate synthetic text data."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which Amazon Transcribe feature can be used to customize transcription output to recognize domain-specific terms?",
    "o": [
      "Custom vocabulary",
      "Automatic language identification",
      "Multi-channel recognition",
      "Streaming transcription"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which function can an AWS Glue crawler perform? (Select THREE.)",
    "o": [
      "Insert data in tables in the AWS Glue Data Catalog.",
      "Help populate the AWS Glue Data Catalog with a metadata table.",
      "Run periodically to detect the availability of new data.",
      "Run periodically to detect changes to existing data, including table definition changes."
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which source does AWS Pricing Calculator use to create estimates?",
    "o": [
      "AWS Price List API",
      "Public Amazon S3 bucket",
      "AWS Cost Explorer console",
      "Customer pricing contract"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "AWS Lake Formation allows permissions to be given to AWS accounts and organizations outside of the account that created the data lake.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A company wants to securely connect its on-premises data center to AWS services without exposing traffic to the public internet. AWS PrivateLink MOST LIKELY provides the required connectivity.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon SageMaker AI Canvas provides a graphical interface that can be used to create machine learning models without writing code.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "If an AWS Lambda function is invoked again while a request is still being processed, another instance of the Lambda function is provisioned, increasing the function's concurrency.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "A data analyst wants to troubleshoot an error in an AWS Step Functions workflow. Which of these services can help the analyst visualize the components of the state machine and trace requests as they are processed?",
    "o": [
      "Amazon CloudWatch Logs",
      "Amazon EventBridge",
      "AWS CloudTrail logs",
      "AWS X-Ray"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which Amazon Textract API is best suited to extract information from a travel passport?",
    "o": [
      "AnalyzeDocument",
      "AnalyzePassportDoc",
      "AnalyzeID",
      "AnalyzeIDDoc"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What can be used to sign in users through social identity providers (such as Amazon, Google, and Facebook) and SAML identity providers?",
    "o": [
      "Amazon Cognito identity pool",
      "AWS Directory service",
      "Amazon Cognito user pool",
      "Amazon Cognito social pool"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "When working together, an Amazon Elastic Container Registry (Amazon ECR) repository can be in a different AWS Region than Amazon SageMaker AI Studio.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is the best description of an AWS Region?",
    "o": [
      "The physical location of a single AWS data center.",
      "Multiple, isolated, and physically separate Availability Zones within a geographic area.",
      "A combination of exactly two AWS Availability Zones."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which term is used for resources generated by an AWS CloudFormation template?",
    "o": [
      "An instance",
      "A stack",
      "A group",
      "A script"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "The Amazon Titan Text Premier model can be accessed through the AWS SDK or AWS Command Line Interface.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about pagination are correct? (Select TWO.)",
    "o": [
      "With pagination, the query results are divided into \"pages\" of data that are 1 MB in size (or less).",
      "The NextEvaluatedKey from a query response should be used as the ExclusiveStartKey for the next query request.",
      "The LastEvaluatedKey from a query response should be used as the ExclusiveStartKey for the next query request."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Users can add Amazon Redshift Spectrum tables to multiple Amazon Redshift clusters, and query the same data in Amazon S3 from any cluster in any AWS Region.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which resource is a collection of predefined rule groups available in AWS WAF to help get users started quickly?",
    "o": [
      "AWS WAF quick start guide",
      "Custom rules",
      "Managed rules",
      "Rate-based rules"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the default setting for how network access control lists handle traffic?",
    "o": [
      "Allow all traffic, both inbound and outbound.",
      "Block all traffic, both inbound and outbound.",
      "Allow all incoming traffic, but block all outgoing traffic.",
      "Allow all outgoing traffic, but block all incoming traffic."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which problem does AWS Site-to-Site VPN solve?",
    "o": [
      "Communicating between VPCs on AWS",
      "Communicating between a remote network and VPCs on AWS",
      "Communication between AWS and the internet",
      "Communication between the internet and on-premises locations"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the primary purpose of LangChain?",
    "o": [
      "To train large language models",
      "To build applications based on large language models",
      "To deploy large language models on cloud platforms",
      "To perform natural language processing tasks"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which Amazon CloudFront feature can be used to quickly redirect traffic to an alternate origin during a failover event?",
    "o": [
      "Origin access identity (OAI)",
      "Cache policies",
      "Origin groups",
      "Distribution behaviors"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Secrets Manager provides built-in integration with other AWS services, rotating database credentials on behalf of users automatically. Which AWS service does Secrets Manager support? (Select THREE.)",
    "o": [
      "Amazon RDS",
      "Amazon Redshift",
      "Amazon DynamoDB",
      "Amazon DocumentDB"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "How does Amazon Kinesis Data Streams collect and process large streams of data records?",
    "o": [
      "In a batch",
      "In a micro batch",
      "In real time",
      "In Amazon S3"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which classification machine learning problems are supervised learning algorithms good at solving? (Select TWO.)",
    "o": [
      "Binary",
      "Cluster",
      "Multiclass",
      "Anomaly"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Identity and Access Management (IAM) policy statements can include variables when the exact value of a resource or condition key isn't known.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resource provides a connection between an on-premises data center or branch office and AWS Cloud resources?",
    "o": [
      "A virtual private network (VPN)",
      "A virtual private cloud (VPC)",
      "A transit gateway",
      "An internet gateway"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "AWS Lake Formation allows for column, row, and cell-level security on database tables.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statements best describe the shared responsibility model for AWS security? (Select TWO.)",
    "o": [
      "AWS is responsible for the security of the underlying cloud infrastructure.",
      "AWS is responsible for securing workloads that customers deploy on AWS.",
      "Customers are responsible for the security of the underlying cloud infrastructure.",
      "Customers are responsible for securing workloads that they deploy on AWS."
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What library is used by Amazon SageMaker AI RL (reinforcement learning) to simulate real-world environments?",
    "o": [
      "Numpy",
      "Pygmentize",
      "Gym",
      "Jim"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Virtual private cloud (VPC) peering connections can route traffic by using private IPv4 or IPv6 addresses.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "An administrator wants to schedule pods in an AWS Fargate cluster. Which type of profile must the administrator define at least one of that will specify which pods use Fargate when launched.",
    "o": [
      "Amazon Elastic Kubernetes Service (Amazon EKS)",
      "User",
      "AWS Fargate",
      "Amazon Elastic Container Registry (Amazon ECR)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of endpoint is a network interface that serves as an entry point for traffic that's destined to an AWS service, and also integrates with AWS PrivateLink?",
    "o": [
      "AWS PrivateLink endpoints",
      "Gateway VPC endpoints",
      "Gateway load balancer endpoints",
      "Interface VPC endpoints"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which features does Amazon Athena offer? (Select TWO.)",
    "o": [
      "It dynamically partitions streaming data.",
      "It uses standard SQL.",
      "It is serverless, with no infrastructure to manage.",
      "It optimizes workload storage performance and cost."
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which computing devices, validated under the FIPS 140-2 program, does AWS Key Management Service (AWS KMS) use to generate and protect keys?",
    "o": [
      "Keys protection modules",
      "Automatic key generators",
      "Hardware security modules",
      "Security key modules"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Amazon S3 Lifecycle expiration actions will move objects to a different storage class before deleting.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the pricing model for the Amazon Kendra service?",
    "o": [
      "Subscription-based",
      "Pay-as-you-go",
      "Tiered pricing",
      "Flat rate"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is true about virtual private cloud (VPC) peering connections? (Select TWO.)",
    "o": [
      "There is no single point of failure for communication.",
      "There is no bandwidth bottleneck.",
      "VPC peering connections require a public subnet."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is an example of using AWS Key Management Service (AWS KMS) to encrypt objects in an Amazon S3 bucket?",
    "o": [
      "Client-side encryption",
      "Server-side encryption"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which statement best describes the function of a Traffic Mirroring filter?",
    "o": [
      "It screens out problematic traffic before the traffic enters a network.",
      "It determines which external IPs are allowed to access content in a network.",
      "It establishes a relationship between a traffic mirror source and a traffic mirror target.",
      "It determines which traffic is copied from a traffic mirror source and sent to a traffic mirror target."
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "A team of developers wants to experiment with different AI models and configurations before using them in an application. Which action should they take?",
    "o": [
      "Enable model access.",
      "Modify inference parameters to influence model responses.",
      "Use Amazon Bedrock console playgrounds.",
      "Deploy models directly from playgrounds to production environments."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS Identity and Access Management (IAM) component is intended to be assumable by anyone who needs it, does not have standard long-term credentials (such as a password or access keys) associated with it, and provides temporary security credentials for a session?",
    "o": [
      "User",
      "Group",
      "Role",
      "Policy"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "The Amazon Titan Image Generator G1 model can ONLY generate images from text prompts and cannot edit existing images.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A network monitoring system needs to notify multiple external systems when an alarm occurs. What is the best way to perform this integration, given only the previous information?",
    "o": [
      "Create an AWS Lambda function that will handle the logic of each integration and call them all.",
      "Create an Amazon SQS queue and push each alarm to the queue so that external systems can pool alarms.",
      "Create a new Amazon SNS topic, and create Amazon CloudWatch alarms that send a notification to the new topic. External systems should subscribe to the topic and listen for notifications."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is the length of time before an Amazon Kinesis Data Streams application can start consuming data from an Amazon Managed Service for Apache Flink stream?",
    "o": [
      "5 minutes",
      "1 hour",
      "1 minute",
      "Almost immediately"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which prompt engineering technique provides multiple examples to establish a pattern for a generative AI model to follow?",
    "o": [
      "Zero-shot prompting",
      "Few-shot prompting",
      "Chain-of-thought prompting",
      "Temperature control"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Elasticity is defined as the ability to add or remove resources automatically so that they closely match the current demand at any given point in time.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is a connector in Amazon Managed Service for Apache Flink?",
    "o": [
      "A series of Apache Flink operators or SQL statements that process input and produce output.",
      "Built-in visualizations to explore the data.",
      "Software components that move data into and out of a Amazon Managed Service for Apache Flink application.",
      "A feature for saving the current application state."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What is true about default virtual private clouds (VPCs)? (Select THREE.)",
    "o": [
      "All instances deployed to a default VPC are private.",
      "All instances deployed to a default VPC are public.",
      "A default VPC is created in each AWS Region in an account.",
      "Default VPCs can be modified."
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What does Amazon EC2 provide in the cloud that is secure and resizable?",
    "o": [
      "Storage capacity",
      "Databases tables",
      "Compute capacity",
      "Backup volumes"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Amazon Quick is built with a super-fast, parallel, in-memory calculation engine. What is the engine called?",
    "o": [
      "NUTMEG",
      "PEPPER",
      "SPICE",
      "LAZER"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Amazon S3 bucket policy sizes have a 20 KB limit.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "What is a benefit of Amazon Data Firehose?",
    "o": [
      "Archival storage",
      "Docker container integration",
      "Serverless data analytics",
      "Near real-time data delivery"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Manufacturing and Automotive",
    "q": "Which service securely onboards, organizes, monitors, and remotely manages IoT devices at scale?",
    "o": [
      "AWS IoT Core",
      "AWS IoT Device Management",
      "AWS IoT Analytics",
      "AWS IoT Device Defender"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which Amazon S3 server-side encryption type encrypts the encryption key itself with a root key that is regularly rotated?",
    "o": [
      "Server-side encryption with KMS keys stored in AWS Key Management Service (SSE-KMS)",
      "Server-side encryption with customer-provided keys (SSE-C)",
      "Server-side encryption with Amazon S3 managed keys (SSE-S3)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "A travel company wants to provide personalized recommendations for vacation packages to its customers. What is the MOST efficient approach using Amazon Personalize?",
    "o": [
      "Develop custom machine learning models from scratch to generate recommendations.",
      "Use the Amazon Personalize pre-built recommenders for media and entertainment.",
      "Provide user activity data and item inventory to Amazon Personalize for model training.",
      "Manually analyze user data to identify patterns and provide recommendations."
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Amazon Bedrock Knowledge Bases can retrieve text-based information only, and cannot process or return visual resources from documents.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which type of system does Amazon Polly have that can produce even higher quality voices than its standard voices?",
    "o": [
      "An artificial intelligence system",
      "A neural TTS system",
      "A neural network system",
      "A machine learning system"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which storage options are supported by Amazon OpenSearch Service? (Select TWO.)",
    "o": [
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic File System (Amazon EFS)",
      "AWS Backup"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which stages are typical in a code pipeline? (Select THREE.)",
    "o": [
      "Source",
      "Build",
      "Deploy",
      "Stage"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which methods are valid for creating an AWS Key Management Service (AWS KMS) key? (Select THREE.)",
    "o": [
      "AWS Management Console",
      "AWS API",
      "AWS CloudFormation template",
      "Amazon EC2 user data"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are the main features and capabilities of Amazon SageMaker AI Inference?",
    "o": [
      "Used only to build and train machine learning models, without any deployment options",
      "Exclusively supports batch inferences, and does not integrate with MLOps tools",
      "Used to deploy machine learning models for making predictions, offering both endpoint-based inferences and batch inferences, and integrating with MLOps tools for effective model management",
      "Provides only real-time, endpoint-based inferences, and is not suitable for batch processing or integration with MLOps tools"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which Amazon S3 feature automatically changes data storage tiers based on user specifications?",
    "o": [
      "Amazon SNS notifications",
      "Lifecycle configuration",
      "Amazon S3 Glacier",
      "Event notifications"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What provides a record of an activity recorded by the application or resource being monitored?",
    "o": [
      "Log groups",
      "Log streams",
      "Log events",
      "JSON objects"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which database engines does Amazon RDS support? (Select THREE.)",
    "o": [
      "SQLite",
      "Oracle",
      "PostgreSQL",
      "MySQL"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Users can run existing Scala or Python code on AWS Glue by uploading the code to Amazon S3 and creating one or more jobs that use that code.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is a catalog in AWS Service Catalog?",
    "o": [
      "A collection of products that an administrator creates, adds to portfolios, and provides updates for",
      "A collection of products with configuration information that determines who can use those products and how they can use them",
      "A service or application for end users"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which parameter in the invokeModel function in Amazon Bedrock controls the randomness of generated output?",
    "o": [
      "Prompt",
      "ModelId",
      "Temperature",
      "Max_gen_len"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Users can use AWS Amplify libraries even if they do not use the Amplify CLI.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which languages does Amazon Kendra support? (Select THREE.)",
    "o": [
      "Hindi",
      "Persian",
      "Japanese",
      "Telugu"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Administrators can use Amazon Cognito to set up password policies and verify the email addresses and phone numbers of users.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which AWS service is a cloud-based integrated development environment (IDE) that can be used to write, run, and debug code with just a browser? (Note: AWS Cloud9 is no longer available to new customers.)",
    "o": [
      "AWS CloudFormation",
      "AWS Cloud9",
      "AWS SAM",
      "AWS Cloud Development Kit"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Traffic in appliance mode is routed correctly as long as the source and destination traffic are coming to a centralized virtual private cloud (VPC) from the same transit gateway attachment.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which statement about managed rule groups in AWS WAF is true?",
    "o": [
      "They are custom-built rules created by users to filter web traffic.",
      "They are predefined, ready-to-use rules that AWS writes and maintains for you.",
      "They are user-defined rules that can be shared with other AWS users.",
      "They are automated rules generated by machine learning algorithms."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which Amazon Polly API should be used to synthesize a large amount of text?",
    "o": [
      "SpeechSynthesisTask",
      "GetSpeechSynthesisTask",
      "SynthesizeSpeech",
      "StartSpeechSynthesisTask"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which AWS Regions support Amazon Bedrock Agents? (Select THREE.)",
    "o": [
      "Europe (Stockholm)",
      "US East (N. Virginia)",
      "Asia Pacific (Singapore)",
      "Europe (Frankfurt)"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which Amazon S3 feature can force an action to occur after an event takes place within a bucket?",
    "o": [
      "CloudWatch alarms",
      "Lambda functions",
      "Event notifications",
      "Triggers"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is AWS Lambda? (Select THREE.)",
    "o": [
      "A server-based service.",
      "A serverless computing service.",
      "A service that runs code without provisioning or managing servers.",
      "A service that runs and scales code with high availability."
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers created a deployment group for an AWS CodeDeploy application. They want to alert their remote team when the deployment is completed. How can they achieve this?",
    "o": [
      "Create an Amazon Simple Notification Service (Amazon SNS) trigger and add the remote team to the topic.",
      "Create an AWS Lambda function trigger that sends a JSON message to the remote team.",
      "Create an Amazon Simple Queue Service (Amazon SQS) queue for the remote team that receives messages from CodeDeploy."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which options are available in AWS CloudFormation to remediate resources that show a “drifted” state? (Select THREE.)",
    "o": [
      "Manually change the resource so that it matches the template again.",
      "Set up CloudFormation to automatically reverse the changes.",
      "Create an AWS Lambda function to check for drift and revert any changes it finds.",
      "Change the template to match the resource that has been changed."
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of policies are JSON policy documents that are attached to an item, such as an Amazon S3 bucket?",
    "o": [
      "Identity-based",
      "Resource-based",
      "Service-based",
      "Access-based"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the MOST suitable use case for LangChain tools?",
    "o": [
      "Building highly available and scalable web applications",
      "Batch processing of large datasets stored in Amazon S3",
      "Developing applications powered by language models and integrating with external services",
      "Real-time file processing invoked by Amazon S3 uploads"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which component in the AWS Glue Data Catalog recognizes the format of the data and generates the schema?",
    "o": [
      "Worker",
      "Database",
      "Classifier",
      "Connection"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is the primary purpose of Amazon Bedrock Guardrails?",
    "o": [
      "Increase the token processing speed of foundation models.",
      "Prevent harmful content generation and protect sensitive information.",
      "Translate content between different languages.",
      "Reduce the cost of using foundation models."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "AWS Transit Gateway connects only virtual private clouds (VPCs) on AWS.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which sections are included in the Amazon CloudWatch agent configuration JSON file? (Select THREE.)",
    "o": [
      "Agent",
      "Metrics",
      "Events",
      "Logs"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What happens if a weekly maintenance window is not specified when creating an RDS DB instance?",
    "o": [
      "A 30-minute window will be assigned by default.",
      "The DB instance will not start.",
      "A maintenance window will not be created.",
      "A read replica instance will automatically be created."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which best practice should be used to design a transit gateway? (Select TWO.)",
    "o": [
      "Use a separate subnet for each transit gateway VPC attachment.",
      "Add additional transit gateways for high availability.",
      "Associate the same VPC route table with all of the subnets that are associated with the transit gateway.",
      "With multiple transit gateways, use the same Autonomous System Number (ASN) for each."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "When an AWS Key Management Service (AWS KMS) key is rotated, all resources encrypted with that key must be encrypted with the new version.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Virtual private cloud (VPC) endpoints allow fine-grained control over access to AWS services by using AWS Identity and Access Management (IAM) policies to restrict access to specific resources or actions.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "A food delivery app requires: 1. Customer orders goods; 2. Seller acknowledges order receipt; 3. Seller sends package, notifies customer; 4. Courier delivers package, acknowledges delivery. How can AWS Step Functions be used? (Select TWO.)",
    "o": [
      "By implementing a \"Callback Pattern\" on the acknowledge step, AWS Step Functions tells Lambda to go to the next step in the workflow.",
      "AWS Step Functions can pause the workflow and wait for manual acknowledgement of the order by the seller.",
      "Express workflows should be used to support this use case because it can operate on higher execution rates.",
      "AWS Step Functions can deliver the food."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "An AWS Config rule represents desired configurations for a resource and is evaluated against configuration changes on the relevant resources, as recorded by AWS Config.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which information must be included when making an API call to an Amazon Bedrock foundation model (FM)?",
    "o": [
      "Max tokens",
      "Model ID",
      "Language",
      "Model ARN"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Using Amazon Bedrock, users can invoke multiple large language models (LLMs) from different providers by using a single API.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which mandatory configuration settings does the Amazon Kinesis agent support when writing to Amazon Data Firehose? (Select TWO.)",
    "o": [
      "deliveryStream",
      "initialPosition",
      "dataProcessingOptions",
      "filePattern"
    ],
    "a": [
      0,
      3
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Athena supports the ingestion of compressed data.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon EMR is run on clusters of Amazon EC2 instances.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which types of AWS Identity and Access Management (IAM) policies are valid? (Select THREE.)",
    "o": [
      "Third-party policies",
      "Customer managed policies",
      "AWS managed policies",
      "Inline policies"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which service does Amazon CloudWatch use to send alarm notifications?",
    "o": [
      "AWS Lambda",
      "Amazon Simple Queue Service (Amazon SQS)",
      "Amazon Simple Notification Service (Amazon SNS)"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which features does AWS Amplify offer? (Select THREE.)",
    "o": [
      "Host a web app.",
      "Create or delete backend environments.",
      "Set up a CICD on the frontend.",
      "Set up a CICD pipeline of the frontend and backend."
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "AWS Identity and Access Management (IAM) users can belong to multiple groups, but IAM user groups cannot be nested.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the outcome if an AWS Identity and Access Management (IAM) policy contains both an Allow and a Deny statement for the same resource?",
    "o": [
      "The Deny statement will take priority.",
      "The Allow statement will take priority.",
      "The IAM policy will generate an error when trying to save."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is RAG in the context of natural language processing?",
    "o": [
      "A type of neural network architecture for image processing",
      "A method for compressing text data for efficient storage",
      "A technique for data augmentation in text classification tasks",
      "A process of optimizing LLM output so that the output references an authoritative knowledge base"
    ],
    "a": 3,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which type of CIDR does AWS Transit Gateway support?",
    "o": [
      "IPv4 only",
      "IPv6 only",
      "Both",
      "Neither"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which AWS service provides quick, efficient code collaboration? (Note: AWS Cloud9 is no longer available to new customers.)",
    "o": [
      "AWS CodeBuild",
      "AWS CodeDeploy",
      "AWS Cloud9",
      "AWS Cloud Development Kit"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Amazon Bedrock can be used to create and manage knowledge bases by using a vector database?",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "Data engineers want to delegate Amazon EC2 permissions to users and also grant public access to an Amazon S3 bucket. Which actions should be part of the solution? (Select TWO.)",
    "o": [
      "Create a resource-based policy to grant EC2 permissions.",
      "Create an identity-based policy to grant EC2 permissions.",
      "Create a resource-based policy to grant public access to an S3 bucket.",
      "Create an identity-based policy to grant public access to an S3 bucket."
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which type of Python library can data engineers use for data analysis and visualization?",
    "o": [
      "Boto3",
      "Pandas",
      "Cloudia",
      "SageMaker"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are the primary hyperparameters used to tune the Random Cut Forest model? (Select TWO.)",
    "o": [
      "num_forest",
      "num_trees",
      "num_samples_per_tree",
      "alpha"
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the term for the optimal behavior or strategy that maximizes an agent's cumulative reward in reinforcement learning?",
    "o": [
      "Value function",
      "Action space",
      "Policy",
      "Reward function"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which type of document, within AWS Systems Manager, does AWS Config use to apply remediation?",
    "o": [
      "Policy",
      "Lambda",
      "Automation",
      "Command"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which sections are mandatory in an AWS Serverless Application Model (AWS SAM) template? (Select TWO.)",
    "o": [
      "Transform",
      "Parameters",
      "Resources",
      "Outputs"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which file types does Amazon Quick support? (Select THREE.)",
    "o": [
      "CSV",
      "JSON",
      "Parquet",
      "XLSX"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "The Principal element is used in a resource-based JSON policy to specify the principal that is allowed or denied access to a resource. What is an example of a principal that can be specified? (Select THREE.)",
    "o": [
      "IAM user",
      "IAM role",
      "S3 Bucket",
      "AWS services"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which resource provides an IP address for an NFSv4 endpoint on which a file system in Amazon Elastic File System (Amazon EFS) can be mounted?",
    "o": [
      "An access point",
      "A file share",
      "A mount target",
      "A resource policy"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which statement describes how an AWS Lambda proxy integration functions?",
    "o": [
      "When a client submits an API request, Amazon API Gateway forwards the request to a specific proxy.",
      "When a client submits an API request, Amazon API Gateway passes to the integrated AWS Lambda function the raw request as-is, except that the order of the request parameters is not preserved.",
      "The AWS Lambda function is integrated directly within the client request without using Amazon API Gateway."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which DNS record type is used to link an IPv4 address to a host name?",
    "o": [
      "AAAA",
      "MX",
      "A",
      "CNAME"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "How does AWS Network Firewall achieve fault tolerance and high availability?",
    "o": [
      "By distributing network traffic across multiple AWS Regions",
      "By using elastic load balancers",
      "By deploying in multiple Availability Zones",
      "By encrypting network traffic"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which types of models are offered by Amazon Titan? (Select THREE.)",
    "o": [
      "Embeddings",
      "Text generation",
      "Speech recognition",
      "Image generation"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statements describe the main features of AWS Service Catalog? (Select THREE.)",
    "o": [
      "Service Catalog users can centrally manage commonly deployed IT services, documentation, and principals.",
      "Service Catalog helps users achieve consistent governance and meet compliance requirements.",
      "Service Catalog users can provision cloud resources by using predefined templates.",
      "Service Catalog provides a web-based interface for manually provisioning and configuring AWS resources."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Which features does Amazon CloudWatch Logs provide? (Select THREE.)",
    "o": [
      "Monitor and store log files from multiple systems and AWS services.",
      "Query and analyze log data.",
      "Configure notifications when certain events occur or thresholds are met.",
      "Store and protect any amount of data."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What does the AWS Serverless Application Model (AWS SAM) open source framework build?",
    "o": [
      "Serverless applications",
      "Server-based applications",
      "On-premises applications"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which resources be used to invoke an AWS Lambda function? (Select THREE.)",
    "o": [
      "Event sources",
      "API calls",
      "AWS Command Line Interface (AWS CLI)",
      "AWS Direct Connect"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "What are the recommended minimum and maximum values for the num_trees hyperparameter for a Random Cut Forest algorithm?",
    "o": [
      "1 and 2048",
      "50 and 1000",
      "2 and 1024",
      "There are no limits."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which popular Python libraries are used to prepare and explore machine learning training data? (Select TWO.)",
    "o": [
      "Pandas",
      "NumPy",
      "Amazon SageMaker AI",
      "pip"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "What are considered AWS Identity and Access Management (IAM) entities? (Select THREE.)",
    "o": [
      "IAM users",
      "IAM user groups",
      "IAM role",
      "EC2 instances"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statement in Amazon Athena creates a table from query results?",
    "o": [
      "CREATE",
      "DROP TABLE",
      "CREATE TABLE AS",
      "SELECT"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which types of foundation models are provided by Amazon SageMaker AI JumpStart?",
    "o": [
      "Only proprietary models",
      "Only public models",
      "Both proprietary and public models",
      "Neither proprietary nor public models"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "Which service features does Amazon Bedrock support? (Select THREE.)",
    "o": [
      "Experiment with prompts and configurations.",
      "Augment response generation with information from data sources.",
      "Create applications that reason through tasks to assist customers.",
      "Configure Amazon EC2 instances."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Security",
    "q": "AWS Identity and Access Management (IAM) user groups can contain many IAM users, and an IAM user can belong to multiple IAM user groups.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "Application requirements have changed, and a user wants to move from a standard queue to a FIFO queue in Amazon Simple Queue Service (Amazon SQS). What must the user do before moving to a FIFO queue?",
    "o": [
      "Ensure that the DelaySeconds parameter is not set per message, and provide a group message ID for each message.",
      "Purge all messages from existing queues.",
      "Set the visibility timeout to zero on the standard queue.",
      "Configure long polling on the standard queue."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What must occur to encrypt an existing unencrypted Amazon Elastic Block Store (Amazon EBS) snapshot? (Select TWO.)",
    "o": [
      "The user must associate an AWS Key Management Service (AWS KMS) key with the existing snapshot.",
      "The user must delete the existing snapshot, and then recreate it with encryption enabled.",
      "The user must copy the existing snapshot, and then enable encryption on the copy."
    ],
    "a": [
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "To begin receiving Amazon Simple Notification Service (Amazon SNS) notifications, an email address must confirm the subscription.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Data engineers deployed an application using AWS CodeDeploy. After a few moments, the deployment status showed Failed. How should they troubleshoot this issue? (Select THREE.)",
    "o": [
      "Run the list-deployment-instances command in the CLI.",
      "Run the get-deployment-instance command in the CLI.",
      "View log file data in Amazon CloudWatch or at the CodeDeploy EC2 instance.",
      "Run code-deploy-flush from the CLI."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which Amazon CloudFront managed response headers policy is used to add a set of security headers to all responses that CloudFront sends to viewers?",
    "o": [
      "SecurityHeadersPolicy",
      "SimpleCORS",
      "CORS-With-Preflight",
      "Strict-Transport-Security"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "It is possible to enforce encryption of all new Amazon Elastic Block Store (Amazon EBS) volumes and snapshots by default in an account.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Which statements about the scan operation in Amazon DynamoDB are correct? (Select TWO.)",
    "o": [
      "A scan consumes the same amount of read capacity when a filter expression is present.",
      "A scan consumes more read capacity when a filter expression is present.",
      "A filter expression is applied after a scan finishes but before the results are returned."
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "AWS Industry Quest: Healthcare",
    "q": "What is the correct endpoint for the Amazon Location Service Geofences API in the us-west-2 Region?",
    "o": [
      "https://cp.geofencing.geo.us-west-2.amazonaws.com",
      "https://cp.geofences.geo.us-west-2.amazonaws.com",
      "https://cp.geofencing.geo.us-west-2.amazonaws.com/geofences",
      "https://cp.geofences.us-west-2.amazonaws.com"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "To use Amazon Q Developer in all environments, including integrated development environments (IDEs), a user must have an AWS account.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "What is the purpose of a prompt in the context of Amazon Bedrock? (Select TWO.)",
    "o": [
      "Provide natural language input to large language models on Amazon Bedrock.",
      "Optimize the responses generated by large language models on Amazon Bedrock.",
      "Configure the inference parameters for large language models on Amazon Bedrock.",
      "Specify the task type for model evaluation jobs on Amazon Bedrock."
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "What are the three primary management functions of Amazon EC2 Auto Scaling? (Select THREE.)",
    "o": [
      "Monitor the health of running instances.",
      "Block traffic to unsecured instances.",
      "Replace impaired instances automatically.",
      "Balance capacity across Availability Zones."
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "The notion of a reward signal in reinforcement learning (RL) stems from research into how the human brain maximizes reward and minimizes punishment.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "A user wants to push orders, arriving in an Amazon Simple Queue Service (Amazon SQS) queue, out to multiple queues simultaneously for other types of integrations. Which action is the best option?",
    "o": [
      "Change processing to AWS Lambda.",
      "Create an Amazon Simple Notification Service (Amazon SNS) topic and connect it to the existing SQS queue.",
      "Use Amazon API Gateway to receive SQS messages.",
      "Use AWS Step Functions."
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "When routing through a transit gateway, packets are sent to a specific next-hop attachment based on their destination IP address. Which layer of the OSI model does transit gateway routing operate in?",
    "o": [
      "Layer 3",
      "Layer 7",
      "Layer 2"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Which charges apply, in terms of pricing, for proprietary models in Amazon SageMaker AI JumpStart?",
    "o": [
      "Only software pricing determined by the model provider",
      "Only SageMaker infrastructure charges",
      "Both software pricing determined by the model provider and SageMaker infrastructure charges",
      "Neither software pricing nor SageMaker infrastructure charges"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "What is the result if an AWS Identity and Access Management (IAM) policy is written to allow the s3:Listbucket action on arn:aws:s3:::*?",
    "o": [
      "The user has permission to retrieve a list of all Amazon S3 bucket names in the AWS account.",
      "The user has permission to list the contents of all Amazon S3 buckets in the AWS account.",
      "The user has permission to list the contents of all Amazon S3 buckets in all AWS accounts in the organization."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "What does a 503 error typically indicate in a three-tier application that is accessed through an AWS Application Load Balancer?",
    "o": [
      "Successful connection to the server",
      "Incorrect user authentication",
      "Server unavailability or service outage",
      "Incorrect database configuration"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which resource and property types are valid in AWS Serverless Application Model (AWS SAM)? (Select TWO.)",
    "o": [
      "AWS::Serverless::Lambda",
      "AWS::Serverless::Function",
      "AWS::Serverless::Table",
      "AWS::Serverless::SimpleTable"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Solutions Architect",
    "q": "How can Amazon CloudFront lower costs to distribute content to customers? (Select TWO.)",
    "o": [
      "By removing the need to run cache servers in multiple sites",
      "Data is transferred out to CloudFront at no cost",
      "By removing the need to use dynamic web applications",
      "By removing the need for backend databases"
    ],
    "a": [
      0,
      1
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Amazon Athena attempts to read files specified by the user only when ingesting from an Amazon S3 folder.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "Amazon Transcribe can extract text from both audio and video files.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which API types are supported by Amazon API Gateway? (Select THREE.)",
    "o": [
      "HTTP API",
      "GraphQL API",
      "REST API",
      "WebSocket API"
    ],
    "a": [
      0,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "A custom Amazon SageMaker AI image version is created from a container image. Where is that container image stored?",
    "o": [
      "Amazon Elastic Container Registry (Amazon ECR)",
      "GitHub",
      "Amazon S3",
      "AWS CodeCommit"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which Amazon CloudWatch alarm states are valid? (Select THREE.)",
    "o": [
      "ERROR",
      "OK",
      "INSUFFICIENT_DATA",
      "ALARM"
    ],
    "a": [
      1,
      2,
      3
    ],
    "e": ""
  },
  {
    "t": "Machine Learning",
    "q": "With Amazon SageMaker AI, users can import their own machine learning algorithms.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which resources can be associated with a regional web ACL in AWS WAF? (Select THREE.)",
    "o": [
      "Amazon API Gateway REST API",
      "Application Load Balancer",
      "Amazon CloudFront distribution",
      "Amazon Cognito user pool"
    ],
    "a": [
      0,
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which statement accurately describes how AWS Step Functions can be used to orchestrate AWS Lambda and Amazon SageMaker AI?",
    "o": [
      "AWS Step Functions can invoke Lambda functions and SageMaker endpoints in a specific order, allowing for complex workflows and data processing pipelines.",
      "AWS Step Functions can orchestrate Lambda functions but not SageMaker endpoints.",
      "AWS Step Functions can orchestrate SageMaker endpoints but not Lambda functions.",
      "AWS Step Functions cannot orchestrate Lambda functions or SageMaker endpoints."
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Security",
    "q": "A solutions architect wants to detect drift on resources by using AWS CloudFormation. Which resources can detect drift? (Select TWO.)",
    "o": [
      "A stack of resources provisioned by CloudFormation",
      "Any resource in the account, regardless of provisioning method",
      "An individual resource within a stack provisioned by CloudFormation",
      "Any resource in other accounts"
    ],
    "a": [
      0,
      2
    ],
    "e": ""
  },
  {
    "t": "Networking",
    "q": "Which type of traffic is an Application Load Balancer designed to handle on AWS?",
    "o": [
      "HTTP and HTTPS traffic",
      "Database traffic",
      "SMTP and POP3 traffic",
      "FTP traffic"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Serverless Developer",
    "q": "Which programming languages does Amazon Q support?",
    "o": [
      "Python, Java, Javascript, C#, and Ruby",
      "Perl and Assembly language",
      "Matlab",
      "NoSQL, CSS, and R"
    ],
    "a": 0,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which types of data sources can Amazon Kendra index? (Select THREE.)",
    "o": [
      "Relational databases such as Amazon RDS and Amazon Aurora",
      "Cloud storage services such as Amazon S3 and Amazon Glacier",
      "Enterprise applications such as Salesforce, Microsoft SharePoint, and ServiceNow",
      "Streaming data sources such as Amazon Kinesis Data Streams and Amazon Managed Streaming for Apache Kafka"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "When is a lower temperature setting (closer to 0) most useful with a generative AI model? (Select TWO.)",
    "o": [
      "When generating creative content such as poetry",
      "When accuracy is crucial for technical tasks",
      "When the goal is diverse and varied responses",
      "When the goal is deterministic and focused outputs"
    ],
    "a": [
      1,
      3
    ],
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "The Amazon Titan Text Lite model supports a maximum token response size of 8192.",
    "o": [
      "TRUE",
      "FALSE"
    ],
    "a": 1,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which AWS service integrates with AWS Key Management Service (AWS KMS) to provide logs of all key usage, helping users meet their regulatory and compliance needs?",
    "o": [
      "AWS X-Ray",
      "AWS Systems Manager",
      "AWS CloudTrail",
      "AWS CloudHSM"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Security",
    "q": "Which action can Amazon CloudWatch alarms be configured to perform? (Select THREE.)",
    "o": [
      "Stop an Amazon EC2 instance.",
      "Scale an Auto Scaling group.",
      "Create an AWS Systems Manager OpsItem.",
      "Invoke an AWS Lambda function."
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  },
  {
    "t": "Data Analytics",
    "q": "Where does Amazon Athena store query results and metadata information?",
    "o": [
      "In AWS Glue",
      "In an Amazon Athena database",
      "In an Amazon S3 bucket"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Practitioner",
    "q": "What is the maximum number of speakers that Amazon Transcribe can identify in speaker diarization?",
    "o": [
      "Two speakers",
      "Ten speakers",
      "Thirty speakers",
      "Unlimited speakers"
    ],
    "a": 2,
    "e": ""
  },
  {
    "t": "Generative AI Architect",
    "q": "Which types of data formats are accepted by Knowledge Bases for Amazon Bedrock? (Select THREE.)",
    "o": [
      "PDF",
      "XLS",
      "TXT",
      "JPG"
    ],
    "a": [
      0,
      1,
      2
    ],
    "e": ""
  }
];
