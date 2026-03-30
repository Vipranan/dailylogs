# Claude Plans Guide

## Overview

Claude is Anthropic's AI assistant, available across multiple plans for individuals and teams. This document covers the key plans, their differences, and important features like SSO and Domain Capture.

---

## Plans at a Glance

| Feature | Free | Pro | Team |
|---|---|---|---|
| Price | $0 | $20/month | $25/seat/month (annual) |
| Min. users | 1 | 1 | 5 |
| Usage vs Free | 1× | 5× | 1.25× Pro (standard seat) |
| Context window | Standard | Standard | 200K tokens |
| Claude Code | — | ✓ | ✓ |
| Projects & knowledge bases | — | ✓ | ✓ |
| Shared collaboration | — | — | ✓ |
| Admin & billing dashboard | — | — | ✓ |
| SSO & Domain Capture | — | — | ✓ |
| Role-based permissions | — | — | ✓ |

---

## Individual Plans

### Free Plan — $0/month

- Access to Claude on web, iOS, Android, and desktop
- Basic web search and image analysis
- Limited daily message quota (varies by server load)
- Best for: casual use and exploration

### Pro Plan — $20/month

- At least **5× more usage** per session than the Free tier
- Priority access during high-traffic periods
- Early access to new features
- Access to all Claude models (Haiku, Sonnet, Opus)
- Projects and knowledge bases
- Claude Code access
- Claude in Chrome (beta)

> **Note:** Pro does not include API access. That requires a separate Console account.

---

## Team Plan — $25/seat/month (annual) or $30/seat/month (monthly)

Built for collaborative teams. Requires a **minimum of 5 members**.

### Seat Types

| | Standard Seat | Premium Seat |
|---|---|---|
| Usage | 1.25× Pro | 6.25× Pro |
| Claude Code | ✓ | ✓ |
| Price | $25/seat/month (annual) | Higher — contact Anthropic |

### Key Features

- Everything included in Pro
- **200K context window** — ideal for long documents, contracts, and multi-step conversations
- **Shared projects** — collaborate with teammates on AI-generated content
- **Centralized admin dashboard** — manage users and billing in one place
- **SSO and Domain Capture** — secure, streamlined authentication (see below)
- **Role-based permissions** — control what each user can access
- **Just-in-Time (JIT) Provisioning** — automate user onboarding
- **Microsoft 365 and Slack integrations**
- **Claude in Chrome and Claude for Excel** (beta)
- Option to **purchase extra usage** when limits are reached

### Getting Started

- Use a **business email** to create the organization (Gmail, Yahoo, Hotmail not allowed as the creator's email)
- Sign up at [claude.ai/login](https://claude.ai/login) or upgrade at [claude.ai/upgrade](https://claude.ai/upgrade)
- Your individual Pro/Free account stays separate — you can toggle between them

---

## Pro vs Team: Key Differences

| | Pro | Team |
|---|---|---|
| Who it's for | Individual users | Teams of 5 or more |
| Collaboration | None | Shared projects, team chat |
| Admin controls | None | Full admin dashboard |
| SSO | No | Yes |
| Context window | Standard | 200K tokens |
| Extra usage option | Yes | Yes |
| Best for | Solo professionals, developers | Startups, agencies, departments |

---

## Security Features: SSO and Domain Capture

### What is SSO (Single Sign-On)?

SSO lets your team log into Claude using the same credentials they already use for work — such as a Google Workspace or Microsoft account.

**Without SSO:** Every team member creates a separate Claude username and password.

**With SSO:** Team members click "Sign in with [your company's identity provider]" and they're in — no extra credentials to manage.

**Benefits:**
- No extra passwords to remember
- Centralized access control — revoke access instantly when someone leaves
- More secure (leverages your existing identity provider's security policies)

### What is Domain Capture?

Domain Capture ensures that anyone who signs up for Claude using your company's email domain is automatically added to your Team workspace — instead of creating a loose personal account.

**Example:** Your company uses `@acme.com` emails. With Domain Capture enabled:

- An employee visits claude.ai and signs up with `jane@acme.com`
- Claude recognizes the `@acme.com` domain
- Jane is automatically placed into Acme Corp's Team workspace

**Without Domain Capture:** Jane might create a separate personal account, invisible to your admins — leading to fragmented usage and potential security gaps.

**Benefits:**
- All company usage stays visible and manageable
- No shadow accounts or rogue individual subscriptions
- Easier onboarding — employees don't have to ask IT for an invite

### SSO + Domain Capture Together

These two features work as a pair:

- **Domain Capture** catches employees when they sign up
- **SSO** ensures they authenticate securely through your company's identity system

Together, they give IT teams full visibility and control over who is using Claude and how — without adding friction for employees.

---

## Upgrading to Enterprise

If your team grows beyond **150 seats**, you'll need to upgrade to the Enterprise plan. Enterprise adds:

- **500K context window**
- **SCIM provisioning**
- **Audit logs**
- **HIPAA readiness**
- Custom pricing via Anthropic Sales

Contact the Anthropic sales team at [anthropic.com/contact-sales](https://www.anthropic.com/contact-sales).

---

## Resources

- [Claude Pricing Page](https://claude.com/pricing)
- [What is the Pro Plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)
- [What is the Team Plan?](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)
- [Get Started with Team Plan](https://support.claude.com/en/articles/9267247-get-started-with-the-team-plan)
- [Claude Help Center](https://support.claude.com)