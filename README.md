# **Tire Master Database**

The inventory UI of Tire Master.

<br></br>

---

## **Features**

- Search/Insert data to the inventory database system.
- Create APIs for the inventory page.

<br></br>

---

## **Overview**

```bash
tiremaster_db
├── README.md
├── .gitignore
├── client              ---- Inventory UI of Tire Master
│  ├── .eslintrs.js
│  ├── .prettirerrc
│  ├── .jsconfig.json
│  ├── package.json
│  └── src
└── server              ---- API of database UI
```

<br></br>

---

## **Requirements**

- Node.js
- Tmux

<br></br>

---

## **Repository**

- Clone this repo to your local machine using

```bash
git clone https://github.com/mystina987/tiremaster_db.git
```

<br></br>

---

## **Setup Environment**

Setup Node.js and Tmux environment for the project.

<br></br>

---

- ### **Node.js**

We use n to install Node.js. The n is a tool to manage your node version, though it is not the official way to install Node.js, it is used widely and also very convenient to operate. After installation, you can pick your desired Node.js version and revert to it. As for our project, we use the latest version of Node.js.

1. Setup Node.js environment

```shell
$ curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
$ bash n lts
```

2. Check if Node.js installed

```shell
$ node --version
```

<br></br>

---

- ### **Yarn (Optional)**

The yarn is a node package manager just like npm, but faster, more secure, and more reliable. Since we have npm already, use npm to install yarn.

1. Install yarn through npm

```shell
$ npm install -g yarn
```

2. Check if yarn installed

```shell
$ yarn --version
```

<br></br>

---

- ### **Tmux**

Tmux is a terminal multiplexer: it enables a number of terminals to be created, accessed, and controlled from a single screen. Tmux may be detached from a screen and continue running in the background, then later reattached.

1. Install tmux

```shell
$ sudo apt install tmux
```

2. Check if tmux installed

```shell
$ tmux -V
```

<br></br>

---

- ### **Package management**

The following steps use yarn, replace yarn with npm if you don't have yarn installed.

1. Install packages for frontend web

```shell
$ cd client
$ yarn install
```

2. Install packages for the backend API

```shell
$ cd server
$ yarn install
```

<br></br>

---

- ### **Manage Sessions using tmux**

1. Check for existing tmux sessions.

```shell
$ tmux ls
```

2. Create a session if the desired session doesn’t exist.

```shell
tmux new -s ${YOUR_SESSION_NAME}
```

3. Enter the session if the desired session exists.

```shell
tmux a -t ${YOUR_SESSION_NAME}
```

4. Manage tmux Layout / Windows

- **Ctrl+b "** — split pane horizontally.
- **Ctrl+b %** — split pane vertically.
- **Ctrl+b arrow keys** — switch the pane.
- **Hold Ctrl+b arrow keys** — resize the pane.
- **Ctrl+b c** — create a new window.
- **Ctrl+b n** — move to the next window.
- **Ctrl+b p** — move to the previous window.

<br></br>

---

- ### **Run Services**

1. Run Inventory UI at localhost for development.

```shell
$ cd client
$ yarn start
```

2. Run Build and Serve at the desired port for release.

```shell
$ cd client
$ yarn run build
$ yarn serve -s build -l ${YOUR_HOST_PORT}
```

3. Run Backend API for development/release.

```shell
$ cd server
$ yarn run dev
```

<br></br>

---

## **Package**

- React
- material-ui
- axios
- lodash
- moment
- redux
- express

<br></br>

---

## **License**

- [MIT](https://choosealicense.com/licenses/mit/)
- Copyright © 2020 TireMaster Ltd.
