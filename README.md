# how to set
## get backlog apikey
you can get backlog apikey from individual setting.

## register backlog api to github
after moving to github repository page,<br>
then you register secret.(Setting ⇒ Secrets ⇒ Add a new secret)<br>
<br>
 NAME: BACKLOG_API_KEY<br>
 VALUE: apikey gotten from backlog
 
## create github actions workflow
after moving to github repository page,<br>
then you create workflow.(Actions ⇒ New workflow ⇒ set up a workflow yourseld)

create yml like follows and commit:
```
name: updateBacklog
on: push
jobs:
  backlog:
    runs-on: ubuntu-latest
    steps:
      - name: updateBacklog
        uses: k-yamagata2929/backlog_actions@master
        env:
          PROJECT_KEY: <project_key>
          API_HOST: <host>.backlog.com
          API_KEY: ${{ secrets.BACKLOG_API_KEY }}
```

# how to use
## set commit message
set commit message by using divider '/' like follows:<br>
```
<project-id> / <commit message> / <status>
```

### project-id
ex) PROJECT-12

### commit detail
ex) first commit

### status
 - done: #fix, #fixed, #fixes
 - close: #close, #closed, #closes

ex) #fix

### example of commit message
PROJECT-12 / first commit / #fix


# very helpful
[backlog-notify](https://github.com/bicstone/backlog-notify)
