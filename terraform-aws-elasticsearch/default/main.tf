terraform {
  required_version = "~>0.13.0"
}

variable profile {
  description = "The name of the aws profile to use"
  default     = "default"
}

variable vpc_id {
  description = "The ID of the VPC to use"
}

variable office_ip {
  description = "The ip address of the office to allow access"
  default     = "127.0.0.1/32"
}

locals {
  region    = "ap-northeast-1"
  namespace = "sandbox"
  env       = "default"

  tags = {
    Name        = "${local.namespace}-${local.env}"
    Namespace   = local.namespace
    Environment = local.env
    Terraform   = "true"
  }
}

provider aws {
  profile = var.profile
  region  = local.region
}

data aws_caller_identity current {}
data aws_region current {}

module elasticsearch {
  source     = "../modules/elasticsearch"
  domain     = "${local.namespace}-${local.env}"
  account_id = data.aws_caller_identity.current.account_id
  region     = data.aws_region.current.name

  tags = local.tags
}
