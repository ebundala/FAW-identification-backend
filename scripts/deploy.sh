#!/usr/bin/env bash

ssh-add 
ssh-add -l
#ssh -T git@github.com
git fetch --all
git checkout --force origin/master 
#git status
