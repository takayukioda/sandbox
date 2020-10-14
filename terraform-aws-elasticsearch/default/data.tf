data aws_vpc default {
  id = var.vpc_id
}

data aws_subnet_ids all {
  for_each = toset(["public", "private"])
  vpc_id   = data.aws_vpc.default.id

  tags = {
    Tier = each.value
  }
}
