Steps are also described [here](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

# Checking for existing SSH keys
* Open Git Bash.

* Enter ls -al ~/.ssh to see if existing SSH keys are present:
```
$ ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```

* Check the directory listing to see if you already have a public SSH key. By default, the filenames of the public keys are one of the following:
```
id_rsa.pub
id_ecdsa.pub
id_ed25519.pub
```

# Generating a new SSH key

*Open Git Bash.

* Paste the text below, substituting in your GitHub email address.
```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```
Note: If you are using a legacy system that doesn't support the Ed25519 algorithm, use:
```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

This creates a new ssh key, using the provided email as a label.
```
> Generating public/private ed25519 key pair.
```
* When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.
```
> Enter a file in which to save the key (/c/Users/you/.ssh/id_ed25519):[Press enter]
```
* At the prompt, type a secure passphrase. For more information, see "Working with SSH key passphrases".
```
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```


# Adding your SSH key to the ssh-agent

Before adding a new SSH key to the ssh-agent to manage your keys, you should have checked for existing SSH keys and generated a new SSH key.

If you have GitHub Desktop installed, you can use it to clone repositories and not deal with SSH keys.

* Ensure the ssh-agent is running. You can use the "Auto-launching the ssh-agent" instructions in "Working with SSH key passphrases", or start it manually:
```
# start the ssh-agent in the background
$ eval `ssh-agent -s`
> Agent pid 59566
```
* Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.
```
$ ssh-add ~/.ssh/id_ed25519
```
* Add the SSH key to your GitHub account.




