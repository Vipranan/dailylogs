# Git Document — Standard Operating Procedure (Windows)

---

## 1. Install Git

Download Git for Windows from the official site:

🔗 [https://git-scm.com/download/win](https://git-scm.com/download/win)

Run the installer and follow the setup wizard (use default options).

After installation, open **Git Bash** or **Command Prompt** and verify:

```bash
git --version
```

---

## 2. Configure Git (One-Time Setup)

Open **Git Bash** and run:

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

Open **Git Bash** and run:

```bash
mkdir ~/Airman
cd ~/Airman
```

Or using **Command Prompt / PowerShell**:

```cmd
mkdir %USERPROFILE%\Airman
cd %USERPROFILE%\Airman
```

Confirm you're in the right place:

```bash
pwd
```

You should see:

```
/c/Users/YourUsername/Airman    (Git Bash)
C:\Users\YourUsername\Airman   (Command Prompt / PowerShell)
```

---

## 4. Setup SSH (Best Practice)

Open **Git Bash** and generate a new SSH key:

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

> Select and copy the entire output.

Then paste it into **GitHub → Settings → SSH and GPG Keys → New SSH Key**.

---

## 5. Test Connection

```bash
ssh -T git@github.com
```

Expected output:

```
Hi username! You've successfully authenticated...
```

> If you get a prompt asking to trust the host, type `yes` and press Enter.

---

## 6. Always Enter Airman Before Any Work

**Git Bash:**

```bash
cd ~/Airman
```

**Command Prompt:**

```cmd
cd %USERPROFILE%\Airman
```

**PowerShell:**

```powershell
cd $env:USERPROFILE\Airman
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
C:\Users\YourUsername\Airman\
 ├── repo1\
 ├── repo2\
 └── repo3\
```

### ❌ NEVER

- Clone outside `~/Airman` (or `C:\Users\YourUsername\Airman`)
- Work outside `~/Airman`
- Mix multiple projects in one folder

### ✅ ALWAYS

Run this before any Git operation:

**Git Bash:**

```bash
cd ~/Airman
```

**Command Prompt:**

```cmd
cd %USERPROFILE%\Airman
```

> **Clarification:** This rule is mainly for **starting a new task** (like cloning a repo), not necessarily before every single `git` command. Once you're already inside a repo under `Airman`, you're good to go.

---

## 💡 Windows-Specific Tips

| Tip | Details |
| --- | ------- |
| **Use Git Bash** | Recommended over Command Prompt for a Unix-like experience |
| **Line Endings** | Run `git config --global core.autocrlf true` to avoid line-ending issues |
| **File Paths** | Use forward slashes (`/`) in Git Bash, backslashes (`\`) in CMD/PowerShell |
| **Terminal Options** | Git Bash, Windows Terminal, PowerShell, or VS Code integrated terminal all work |
| **Credential Manager** | Git for Windows includes Git Credential Manager — it will cache your credentials automatically |
