DATABASE_ID=cckh31xjtyu2
INSTANCE_ID=i-0eefccedb32cf8879
INSTANCE_AVAILABILITY_ZONE=us-east-2b
if [[ "$ENV" == "qa" ]]
then
  DATABASE_ID=c4xvv4blctby
  INSTANCE_ID=i-0993558f3ca17e0a2
  INSTANCE_AVAILABILITY_ZONE=us-east-2b
fi
if [[ "$ENV" == "production" ]]
then
  DATABASE_ID=cff0y4vrd0gw
  INSTANCE_ID=i-0c06b6e8787378105
  INSTANCE_AVAILABILITY_ZONE=us-east-2a
fi

echo -e 'y\n' | ssh-keygen -t rsa -f /tmp/temp -N '' >/dev/null 2>&1
aws ec2-instance-connect send-ssh-public-key \
  --instance-id ${INSTANCE_ID} \
  --availability-zone ${INSTANCE_AVAILABILITY_ZONE} \
  --instance-os-user ec2-user \
  --ssh-public-key file:///tmp/temp.pub | cat
ssh -i /tmp/temp \
  -Nf -M -v \
  -L 5432:example-api-db.${DATABASE_ID}.us-east-2.rds.amazonaws.com:5432 \
  -o "UserKnownHostsFile=/dev/null" \
  -o "StrictHostKeyChecking=no" \
  -o ProxyCommand="aws ssm start-session --target %h --document AWS-StartSSHSession --parameters portNumber=%p --region=us-east-2" \
  ec2-user@${INSTANCE_ID}
