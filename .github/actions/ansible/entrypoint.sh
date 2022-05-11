#!/bin/sh
#echo "Ansible Entrypoint"

# echo "[ubuntu18]" >> /hosts
# echo "172.16.130.188" >> /hosts

# echo "[all:vars]" >> /hosts
# echo "ansible_connection=ssh" >> /hosts
# echo "ansible_user= $SSH_USER" >> /hosts
# echo "ansible_ssh_user= $SSH_USER" >> /hosts
# echo "ansible_python_interpreter=/usr/bin/python3.6" >> /hosts
# echo "$SSH_USER"

# echo "ansible_ssh_pass=$SSH_PASSWORD" >> /hosts
# echo "ansible_become_pass=$SSH_PASSWORD" >> /hosts
echo "Ansible Entrypoint"

echo "This is the secret: $SSH_PASSWORD"

echo "Entering the ansible using ansible-playbook"

ansible-playbook ./playbook.yml --user $SSH_USER -vvv
