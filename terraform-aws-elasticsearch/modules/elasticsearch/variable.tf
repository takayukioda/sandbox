variable account_id {
  description = "The aws account id"
}

variable region {
  description = "The aws region to deploy resources"
}

variable tags {
  description = "The map of the tags to apply to resources"
  type        = map(string)
  default     = {}
}

variable domain {
  description = "The name of the (sub) domain name for elasticsearch"
}

variable instance_type {
  description = "Instance type of data nodes in the cluster"
  default     = "t3.small.elasticsearch"
}

variable instance_count {
  description = "Number of instances in the cluster"
  type        = number
  default     = 1
}

variable az_count {
  description = "Number of availability zones"
  type        = number
  default     = 1

  validation {
    condition     = var.az_count >= 1 && var.az_count <= 3
    error_message = "The az_count must be in a range of 1 to 3."
  }
}

variable volume_size {
  description = "The size of the volume to store indexes"
  type        = number
  default     = 10
}

variable office_ip {
  description = "The ip address of the office to allow access"
  default     = "127.0.0.1/32"
}

locals {
  log_types = toset(["application", "index", "search"])
  log_type_map = {
    application = "ES_APPLICATION_LOGS"
    index       = "INDEX_SLOW_LOGS"
    search      = "SEARCH_SLOW_LOGS"
  }
}
