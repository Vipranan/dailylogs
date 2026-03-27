# Git Document — Standard Operating Procedure

---

## 1. Install Git

Check if Git is already installed:

```bash
git --version
```

If not installed:

**macOS:**

```bash
brew install git
```

**Ubuntu:**

```bash
sudo apt update
sudo apt install git -y
```

---

## 2. Configure Git (One-Time Setup)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Verify your configuration:

```bash
git config --list
```

---

## 3. Create the Airman Directory

```bash
mkdir ~/Airman
cd ~/Airman
```

Confirm you're in the right place:

```bash
pwd
```

You should see:

| OS     | Expected Path              |
| ------ | -------------------------- |
| Ubuntu | `/home/username/Airman`    |
| macOS  | `/Users/username/Airman`   |

---

## 4. Setup SSH (Best Practice)

Generate a new SSH key:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

> Press **Enter** for all prompts to accept defaults.

Start the SSH agent:

```bash
eval "$(ssh-agent -s)"
```

Add your key:

```bash
ssh-add ~/.ssh/id_ed25519
```

Copy the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then paste the output into **GitHub → Settings → SSH and GPG Keys → New SSH Key**.

---

## 5. Test Connection

```bash
ssh -T git@github.com
```

Expected output:

```
Hi username! You've successfully authenticated...
```

---

## 6. Always Enter Airman Before Any Work

```bash
cd ~/Airman
```

---

## 7. Clone Repository (Only Inside Airman)

```bash
git clone git@github.com:username/repo-name.git
```

**Example:**

```bash
git clone git@github.com:vipranan/project1.git
```

---

## 8. Move Into the Repo

```bash
cd repo-name
```

---

## 9. Daily Git Workflow

**Check changes:**

```bash
git status
```

**Add changes:**

```bash
git add .
```

**Commit:**

```bash
git commit -m "your message"
```

**Push:**

```bash
git push origin main
```

---

## 10. Branch Workflow

**Create a new branch:**

```bash
git checkout -b feature-branch
```

**Push the branch:**

```bash
git push origin feature-branch
```

**Switch back to main:**

```bash
git checkout main
```

---

## 11. Pull Latest Code

```bash
git pull origin main
```

---

## ⚠️ Strict Rules You Must Follow

### Required Project Structure

```
Airman/
 ├── repo1/
 ├── repo2/
 └── repo3/
```

### ❌ NEVER

- Clone outside `~/Airman`
- Work outside `~/Airman`
- Mix multiple projects in one folder

### ✅ ALWAYS

Run this before any Git operation:

```bash
cd ~/Airman
```

> **Clarification:** This rule is mainly for **starting a new task** (like cloning a repo), not necessarily before every single `git` command. Once you're already inside a repo under `~/Airman`, you're good to go.
