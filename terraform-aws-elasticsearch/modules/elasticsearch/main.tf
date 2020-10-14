resource aws_elasticsearch_domain main {
  domain_name           = var.domain
  elasticsearch_version = "7.7"

  access_policies = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = "es:*"
      Principal = {
        AWS = "*"
      }
      Condition = {
        IpAddress = {
          "aws:SourceIp" = var.office_ip
        }
      }
      Resource = "arn:aws:es:${var.region}:${var.account_id}:domain/${var.domain}/*"
    }]
  })

  cluster_config {
    instance_type  = var.instance_type
    instance_count = var.instance_count

    zone_awareness_enabled = var.az_count == 1 ? false : true
    dynamic zone_awareness_config {
      for_each = var.az_count == 1 ? [] : [1]
      content {
        availability_zone_count = var.az_count
      }
    }
  }

  ebs_options {
    ebs_enabled = true
    volume_type = "gp2"
    volume_size = var.volume_size
  }

  encrypt_at_rest {
    enabled = true
  }

  dynamic log_publishing_options {
    for_each = local.log_types
    content {
      cloudwatch_log_group_arn = aws_cloudwatch_log_group.aes[log_publishing_options.value].arn
      log_type                 = local.log_type_map[log_publishing_options.value]
    }
  }

  node_to_node_encryption {
    enabled = true
  }

  domain_endpoint_options {
    enforce_https       = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  tags = merge(var.tags, {})
}
