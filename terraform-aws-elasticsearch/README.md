Terraform: AWS Elasticsearch Service
=====

Setup elasticsearch service through terraform

required terraform version: `~> 0.13.0`

How to run
-----

- variables
  - `vpc_id`: required
  - `profile`: default -> `default`
  - `office_ip`: default -> `127.0.0.1/32`

```
$ cd default
$ terraform init
$ terraform apply -var vpc_id=vpc-xxxxxxxxxxxxxxxxx
```
