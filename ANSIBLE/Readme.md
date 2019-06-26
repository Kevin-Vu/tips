# Virtual Machine Jar Deployement with Ansible

Deploy your jar in a ubuntu virtual machine and start it automatically.

## Installation
```bash
$ sudo pip3 install ansible
```

## Method 1 : VirtualBox
1. Install VirtualBox and download Ubuntu (18.04)

    ```bash
    $ sudo apt install virtualbox
    ```
    
2. Configure VirtualBox to give the access to the Internet through **bridge** to Ubuntu.
3. Start Ubuntu 18.04 in VirtualBox
4. **On Ubuntu (Virtualbox)** open a un terminal
Enter *ifconfig* and get the ip address
5. **On your pysical linux machine** create a ssh key
Enter *ssh-keygen*
6. Copy the key to your virutal machine

    ```bash
    $ ssh-copy-id -i ~/.ssh/id_rsa.pub vmusername@virtualmachine
    ```

7. Create the needed file for ANSIBLE (Physical machine until the end of this tutorial)
Create a folder 

    ```bash
    $ mkdir ANSIBLE
    ```

8. In the folder create a hosts and a yaml file.

    ```bash
    $ cd ANSIBLE
    $ touch hosts
    $ touch playbook.yml
    ```

9. Edit hosts  

    ```bash
    [somename]
    vmipaddress ansible_connection=ssh ansible_ssh_user=vmusername ansible_ssh_pass=vmpassword ansible_python_interpreter=/usr/bin/python3
    ```

10. Edit playbook.yml (cf. the playbook.yml file) and start the script

    ```bash
    $ ansible-playbook --ask-sudo-pass playbook.yml
    ```

11. Enter the VM password.

## Methode 2 : Vagrant
1. Install Vagrant (virtualbox is necessary for Vagrant)

    ```bash
    $ sudo apt install virtualbox
    $ sudo apt install vagrant
    ```
2. Do step 7 and 8 of method 1.
3. In the ANSIBLE folder

    ```bash
    $ vagrant init
    ```

4. Add your OS (See **https://app.vagrantup.com/boxes/search** )

    ```bash
    $ vagrant box add ubuntu/bionic64
    ```

5. Edit the Vagrantfile

    ```bash
    Vagrant.configure(2) do |config|
      config.vm.box = "ubuntu/bionic64"
    end
    ```

6. Start the VM

    ```bash
    $ vagrant up
    ```

7. Connect with SSH

    ```bash
    $ vagrant ssh
    ```

8. Get the IP address and modify the playbook.yml

    ``` yaml
      ---
      - hosts: ipvragranmachine
    ``` 

9. Edit the Vagrantfile

    ```bash
    Vagrant.configure(2) do |config|
      config.vm.box = "ubuntu/bionic64"
      
      config.ssh.insert_key = false

      config.vm.define 'srv' do |srv|
      	srv.vm.provision "ansible" do |ansible|
        	ansible.verbose = "v"
        	ansible.playbook = "playbook.yml"
        	ansible.extra_vars = { ansible_python_interpreter:"/usr/bin/python3" }
      	end
      end
    end
    ```

10. Start the Ansible script through Vagrant

    ```bash
    $ vagrant provision
    ```
