resource aws_cloudwatch_log_group aes {
  for_each = local.log_types
  name     = "/aws/aes/domains/${var.domain}/${each.value}-logs"
}

resource aws_cloudwatch_log_resource_policy aes {
  for_each    = local.log_types
  policy_name = "aes-${var.domain}-${each.value}-log-publishing-policy"

  policy_document = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "es.amazonaws.com"
      }
      Action = [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream",
      ]
      Resource = "${aws_cloudwatch_log_group.aes[each.value].arn}:*"
    }]
  })
}
