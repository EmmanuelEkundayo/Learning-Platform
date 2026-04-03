const git = {
  id: 'git', title: 'Git', color: 'rose',
  category: 'DevOps',
  description: 'Git workflow: commits, branches, remotes, rebasing, and stashing',
  sections: [
    {
      title: 'Setup & Init',
      items: [
        { label: 'Initial configuration', language: 'bash', code: `git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\ngit config --global core.editor "code --wait"\ngit config --global init.defaultBranch main\ngit config --global pull.rebase false\n\n# View config\ngit config --list\ngit config user.email` },
        { label: 'Initialize and clone', language: 'bash', code: `# New repo\ngit init                     # current directory\ngit init my-project          # new directory\n\n# Clone\ngit clone https://github.com/user/repo\ngit clone git@github.com:user/repo.git\ngit clone --depth 1 https://...  # shallow clone\ngit clone -b develop https://...  # specific branch` },
        { label: 'Remotes', language: 'bash', code: `git remote -v                              # list remotes\ngit remote add origin https://github.com/user/repo\ngit remote add upstream https://github.com/original/repo\ngit remote remove origin\ngit remote rename origin upstream\ngit remote set-url origin git@github.com:user/repo.git` },
        { label: '.gitconfig aliases', language: 'bash', code: `[alias]\n    st = status\n    co = checkout\n    br = branch\n    lg = log --graph --oneline --decorate --all\n    aa = add --all\n    cm = commit -m\n    undo = reset HEAD~1 --mixed\n\n# Usage\ngit lg\ngit cm "feat: add feature"` },
      ]
    },
    {
      title: 'Staging & Committing',
      items: [
        { label: 'git add', language: 'bash', code: `git add file.txt             # stage specific file\ngit add src/                 # stage directory\ngit add .                    # stage all changes\ngit add *.js                 # glob pattern\ngit add -p                   # interactive/partial staging\ngit add -u                   # stage tracked files only (no new)` },
        { label: 'git commit', language: 'bash', code: `git commit -m "feat: add user login"\ngit commit -m "Title" -m "Longer description"\ngit commit --amend -m "Fixed message"  # change last commit msg\ngit commit --amend --no-edit            # add to last commit\ngit commit -a -m "msg"                  # stage tracked + commit`, note: 'Amend only commits that have NOT been pushed to shared branch' },
        { label: 'git status and diff', language: 'bash', code: `git status\ngit status -s              # short format\n\ngit diff                   # unstaged changes\ngit diff --staged          # staged changes (before commit)\ngit diff HEAD              # all changes vs last commit\ngit diff main..feature     # between branches\ngit diff abc123 def456     # between commits` },
        { label: 'git log', language: 'bash', code: `git log\ngit log --oneline --graph --decorate --all\ngit log -n 10              # last 10 commits\ngit log --since="2 weeks ago"\ngit log --author="Alice"\ngit log --grep="hotfix"\ngit log -- path/to/file    # commits touching file\ngit log -p                 # show patches (diffs)\ngit shortlog -sn           # contributors by commit count` },
        { label: 'git show', language: 'bash', code: `git show                     # latest commit\ngit show abc1234             # specific commit\ngit show HEAD~3              # 3 commits back\ngit show main:file.txt       # file content at branch\ngit show abc1234:src/app.js  # file at commit` },
      ]
    },
    {
      title: 'Branching',
      items: [
        { label: 'Create and switch', language: 'bash', code: `# Create + switch\ngit checkout -b feature/login    # classic\ngit switch -c feature/login      # modern (Git 2.23+)\n\n# Switch only\ngit checkout main\ngit switch main\ngit switch -                 # previous branch` },
        { label: 'List and delete', language: 'bash', code: `git branch                   # local branches\ngit branch -a                # all (local + remote)\ngit branch -r                # remote tracking branches\ngit branch -v                # with last commit\n\n# Delete\ngit branch -d feature/done   # safe delete\ngit branch -D feature/oops   # force delete\n\n# Rename\ngit branch -m old-name new-name\ngit branch -M main           # force rename current` },
        { label: 'Tracking branches', language: 'bash', code: `# Create branch tracking remote\ngit checkout -b feature origin/feature\ngit switch --track origin/feature\n\n# Set tracking on existing branch\ngit branch -u origin/main main\ngit branch --set-upstream-to=origin/main\n\n# Show tracking\ngit branch -vv` },
        { label: 'Branch strategies', language: 'bash', code: `# Git Flow branches\nmain          # production\ndevelop       # integration\nfeature/*     # new features\nrelease/*     # pre-release\nhotfix/*      # production fixes\n\n# Trunk-based development\nmain          # production (always deployable)\nfeature/*     # short-lived, merged quickly\n\n# Conventional prefixes\nfeat/   fix/   chore/   docs/   refactor/   test/` },
      ]
    },
    {
      title: 'Merging & Rebasing',
      items: [
        { label: 'git merge', language: 'bash', code: `# Merge feature into main\ngit switch main\ngit merge feature/login\n\n# Keep merge commit (no fast-forward)\ngit merge --no-ff feature/login\n\n# Squash: combine all commits into one staged change\ngit merge --squash feature/login\ngit commit -m "feat: add login (squashed)"`, note: 'No-ff preserves branch history; squash gives clean linear history' },
        { label: 'git rebase', language: 'bash', code: `# Rebase feature onto main\ngit switch feature/login\ngit rebase main\n\n# Abort on conflict\ngit rebase --abort\n\n# Continue after resolving conflict\ngit add resolved-file.txt\ngit rebase --continue\n\n# Skip a commit\ngit rebase --skip`, note: 'Never rebase commits already pushed to shared branches' },
        { label: 'Interactive rebase', language: 'bash', code: `# Rewrite last 3 commits\ngit rebase -i HEAD~3\n\n# In the editor:\n# pick   abc123 first commit   (keep as-is)\n# squash def456 second commit  (squash into previous)\n# reword ghi789 third commit   (keep but edit message)\n# drop   jkl012 fourth commit  (remove entirely)\n# fixup  mno345 fifth commit   (squash, discard message)` },
        { label: 'git cherry-pick', language: 'bash', code: `# Apply a specific commit to current branch\ngit cherry-pick abc1234\n\n# Multiple commits\ngit cherry-pick abc..def         # range\ngit cherry-pick abc def ghi      # list\n\n# Without auto-committing\ngit cherry-pick -n abc1234\n\n# Abort\ngit cherry-pick --abort` },
        { label: 'Merge conflicts', language: 'bash', code: `# When conflict occurs:\ngit status                  # see conflicted files\n\n# Edit files — look for:\n# <<<<<<< HEAD\n# your changes\n# =======\n# incoming changes\n# >>>>>>> feature/branch\n\ngit add resolved-file.js    # mark resolved\ngit merge --continue        # or: git commit\n\n# Use a merge tool\ngit mergetool` },
      ]
    },
    {
      title: 'Remote Repos',
      items: [
        { label: 'push and pull', language: 'bash', code: `# Push\ngit push origin main\ngit push -u origin feature    # set upstream + push\ngit push --all                # push all branches\ngit push origin :old-branch   # delete remote branch\ngit push origin --delete old  # same thing\n\n# Pull (fetch + merge)\ngit pull origin main\ngit pull --rebase origin main  # fetch + rebase`, note: '--force-with-lease is safer than --force when overwriting remote' },
        { label: 'fetch', language: 'bash', code: `git fetch origin               # fetch all\ngit fetch origin main          # fetch specific branch\ngit fetch --all                # fetch all remotes\ngit fetch --prune              # remove deleted remote refs\n\n# Fetch then compare\ngit fetch origin\ngit diff HEAD origin/main      # local vs remote\ngit log HEAD..origin/main      # commits ahead on remote` },
        { label: 'Syncing with upstream', language: 'bash', code: `# Fork workflow\ngit remote add upstream https://github.com/original/repo\ngit fetch upstream\ngit switch main\ngit merge upstream/main\ngit push origin main` },
        { label: 'Tags', language: 'bash', code: `# Create\ngit tag v1.0.0                       # lightweight\ngit tag -a v1.0.0 -m "Release 1.0"   # annotated\ngit tag -a v1.0.0 abc1234            # tag specific commit\n\n# Push\ngit push origin v1.0.0\ngit push origin --tags\n\n# List and delete\ngit tag\ngit tag -d v0.9.0\ngit push origin :refs/tags/v0.9.0` },
      ]
    },
    {
      title: 'Undoing Changes',
      items: [
        { label: 'git restore (unstage/discard)', language: 'bash', code: `# Discard unstaged changes in working tree\ngit restore file.txt\ngit restore .               # discard all\n\n# Unstage (move from staging back to working tree)\ngit restore --staged file.txt\ngit restore --staged .` },
        { label: 'git reset', language: 'bash', code: `# Move HEAD + keep changes staged\ngit reset --soft HEAD~1\n\n# Move HEAD + unstage changes (default)\ngit reset HEAD~1\ngit reset --mixed HEAD~1\n\n# Move HEAD + discard all changes\ngit reset --hard HEAD~1\n\n# Reset single file from commit\ngit reset HEAD~1 -- file.txt`, note: '--hard destroys uncommitted work; ensure nothing important is lost' },
        { label: 'git revert', language: 'bash', code: `# Create new commit that undoes a previous commit\ngit revert abc1234\ngit revert HEAD              # undo last commit\ngit revert HEAD~3..HEAD      # undo last 3 commits\n\n# Revert without auto-committing\ngit revert -n abc1234\ngit commit -m "Revert feature X"`, note: 'Revert is safe for shared branches — it adds history instead of rewriting it' },
        { label: 'git reflog', language: 'bash', code: `# Recovery tool — all HEAD movements\ngit reflog\ngit reflog show feature/branch\n\n# Recover lost commit\ngit reflog                   # find commit hash\ngit checkout -b recovery abc1234\n\n# Recover from bad reset --hard\ngit reflog\ngit reset --hard HEAD@{3}`, note: 'reflog entries expire after 90 days by default' },
        { label: 'Amend and fixup', language: 'bash', code: `# Change last commit message\ngit commit --amend -m "Better message"\n\n# Add forgotten file to last commit\ngit add forgotten.txt\ngit commit --amend --no-edit\n\n# Fixup older commit with rebase\ngit add file.txt\ngit commit --fixup=abc1234\ngit rebase -i --autosquash HEAD~5` },
      ]
    },
    {
      title: 'Stashing',
      items: [
        { label: 'Stash and pop', language: 'bash', code: `git stash                   # stash tracked changes\ngit stash -u                # include untracked files\ngit stash -a                # include ignored files too\ngit stash pop               # apply latest + remove stash\ngit stash apply             # apply latest, keep in stash` },
        { label: 'Manage stashes', language: 'bash', code: `git stash list\n# stash@{0}: WIP on main: abc123 commit msg\n# stash@{1}: On feature: def456 ...\n\ngit stash show stash@{1}    # diff summary\ngit stash show -p stash@{1} # full diff\ngit stash apply stash@{1}   # apply specific stash\ngit stash drop stash@{1}    # delete specific stash\ngit stash clear             # delete all stashes` },
        { label: 'Named stashes', language: 'bash', code: `git stash push -m "WIP: refactor auth module"\ngit stash push -m "half-done login form" src/Login.jsx\n\n# Stash to a branch\ngit stash branch new-branch stash@{0}  # creates branch + applies` },
        { label: 'Partial stash', language: 'bash', code: `# Interactive — choose which hunks to stash\ngit stash -p\n\n# Stash specific files only\ngit stash push -m "only these" -- src/a.js src/b.js\n\n# Keep staged changes out of stash\ngit stash --keep-index` },
      ]
    },
    {
      title: '.gitignore Patterns',
      items: [
        { label: 'Basic patterns', language: 'bash', code: `# Ignore by name (any level)\nnode_modules\n.DS_Store\nThumbs.db\n\n# Ignore by extension\n*.log\n*.env\n*.pyc\n\n# Ignore specific file\n/secrets.json\nconfig/local.py\n\n# Ignore directory\nbuild/\ndist/\n.venv/\n__pycache__/` },
        { label: 'Wildcards', language: 'bash', code: `# * matches anything except /\n*.log\nsrc/*.test.js\n\n# ** matches any path\n**/node_modules\nlogs/**/*.log\n\n# ? matches any single character\ndoc?.txt    # doc1.txt, docA.txt, etc.\n\n# [abc] character class\n*.[oa]     # .o or .a files` },
        { label: 'Negation patterns', language: 'bash', code: `# ! negates a pattern — include despite earlier exclusion\n*.log\n!important.log\n\n# Include specific file in ignored directory\nbuild/\n!build/index.html\n\n# Note: can't re-include if parent dir is ignored\n# This does NOT work:\nbuild/\n!build/index.html  # won't work, build/ ignored entirely\n\n# Fix: ignore contents, not directory\nbuild/*\n!build/index.html  # this works` },
        { label: 'Scope and precedence', language: 'bash', code: `# .gitignore applies from its directory downward\n\n# Global gitignore (all repos)\ngit config --global core.excludesfile ~/.gitignore_global\n\n# ~/.gitignore_global\n.DS_Store\n*.swp\n.idea/\n.vscode/settings.json\n\n# Ignore already-tracked file\ngit rm --cached file.txt\n# then add to .gitignore\n\n# Check why a file is ignored\ngit check-ignore -v filename` },
        { label: 'Common .gitignore templates', language: 'bash', code: `# Node.js\nnode_modules/\nnpm-debug.log\n.env\n.env.local\ndist/\nbuild/\n\n# Python\n__pycache__/\n*.py[cod]\n.venv/\n*.egg-info/\ndist/\n.pytest_cache/\n\n# Editor\n.vscode/\n.idea/\n*.swp\n*.swo\n\n# OS\n.DS_Store\nThumbs.db` },
      ]
    },
  ]
}

export default git
