# DaanNetwork
[![License: MIT](https://img.shields.io/bower/l/bootstrap)](https://github.com/pavas23/DaanNetwork)
[![Github Repo Size](https://img.shields.io/github/repo-size/pavas23/DaanNetwork)](https://github.com/pavas23/DaanNetwork)
[![npm version](https://img.shields.io/npm/v/npm)](https://github.com/pavas23/DaanNetwork)
[![last commit](https://img.shields.io/github/last-commit/pavas23/DaanNetwork)](https://github.com/pavas23/DaanNetwork)
[![contributors](https://img.shields.io/github/contributors/pavas23/DaanNetwork)](https://github.com/pavas23/DaanNetwork)

We have followed the ```Scrum framework``` throughout this project. All the scrum project reports are available in the scrum/ directory.

The complete project was divided into 3 sprints lasting 3 weeks each. Each sprint had six scrum meets, including sprint planning and sprint retrospective meets. `Pivotal Tracker` was used for project management and `Mockaroo` for dummy data generation.

### `Product Backlog`
<p align="center"> 
<img width="900" alt="product-backlog" src="https://github.com/pavas23/DaanNetwork/assets/97559428/c2d0731a-64b4-4f07-bea6-54887507882c">
</p>

### `Use Case Diagram`
<details><summary>View</summary>
<p align="center"> 
<img width="900" alt="product-backlog" src="https://github.com/pavas23/DaanNetwork/assets/97559428/17b0aabf-8c6d-40f1-bf55-00894574a91e">
</p>
</details>

### `Class Diagram`
<details><summary>View</summary>
<p align="center"> 
<img width="900" alt="product-backlog" src="https://github.com/pavas23/DaanNetwork/assets/97559428/08a06d06-81a6-4eca-bf88-d723880f9ee1">
</p>
</details>


### `System Architecture`
<details><summary>View</summary>
<p align="center"> 
<img width="900" alt="product-backlog" src="https://github.com/pavas23/DaanNetwork/assets/97559428/16201bfa-b1d8-43d5-903b-1f413a5a8956">
</p>
</details>


### `Project Management`
<details><summary>View</summary>
<p align="center"> 
<img width="900" alt="product-backlog" src="https://github.com/pavas23/DaanNetwork/assets/97559428/8759cfa5-4c1c-4c49-b650-a98d3ea83333">
</p>
</details>


This is a web based application connecting donors with NGOs for donation requests and responses.

### Donor Management
- Donors can register with their details on the portal.
- Donors can make ```donation posts``` on their profiles.
- Donors can choose to donate to donation drives conducted by NGOs and submit details about the items they can contribute.
- Donors can see ```history``` of their involvement in the portal
- Donors can ```view points and leadership boards``` based on their contributions.

### NGO Management
- NGOs can register with their details on the portal.
- NGO upload registration number and ```registration certificate``` to the admin for verification.
- NGOs view donation requests that are close to their locations and accepts to collect which they desire.
- NGOs can ```host donation drive``` and give details about the requirements about the items they require with respective quantities and end date.
- NGOs can ```raise volunteering requests``` on the portal with details about the same.

### Admin Management
- Admin ```verifies the NGO``` as per the registration certificate uploaded by them.
- Admins can view users and ```block users``` that violate the guidelines.

### Other Functionality
- The donor and NGO ```receive mail``` on successful registration.
- Whenever a donor donates food items for a donation drive, the NGO gets notified via email.
- Donors can ```filter drives``` according to food items they want to donate.
- NGOs can filter donation requests based on ```proximity to their location```.
  
## Preview
<img width="1145" alt="DonorPost" src="https://github.com/pavas23/DaanNetwork/assets/97559428/1d72cfc3-0ff6-4a2d-a976-6d0abc6eb821">
</br> </br>
<img width="1145" alt="DonorPost" src="https://github.com/pavas23/DaanNetwork/assets/97559428/320ff096-fbe5-4dc3-8e66-61fc6069a8c7">
</br> </br>
<img width="1145" alt="DonorPost" src="https://github.com/pavas23/DaanNetwork/assets/97559428/176ac62e-0090-4ac8-9c07-5484c481a67b">
</br> </br>
<img width="1145" alt="DonorPost" src="https://github.com/pavas23/DaanNetwork/assets/97559428/fcb24b88-4d0e-401b-97ec-2888d05b6e84">
</br> </br>

## Run Frontend App

1. clone this git repo <br/>
2. ```cd``` into project directory <br/>
3. ```cd client```
4. ```cd my-app```
5. install this project with npm <br/>
6. install all dependencies with ```npm install``` <br/>
7. create a ```.env``` file in ```my-app``` directory
8. Add the following lines in ```.env``` file
```js
REACT_APP_APIURL=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECTID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
```
9. Set ```REACT_APP_APIURL``` to ```http://localhost:PORT``` for dev env and set this to URL where the backend is hosted for connecting to server
10. now to start the react app use ```npm start``` <br/>

## Run Backend Server

1. clone this git repo <br/>
2. ```cd``` into project directory <br/>
3. ```cd server```
4. install all dependencies with ```npm install``` <br/>
5. ```cd src```
6. create a ```.env``` file in current directory
7. Add the following lines in ```.env``` file
```js
NODE_ENV=
PORT=
MONGO_URI_DEV=
MONGO_URI_PROD=
EMAIL=
PASSWORD=
TOKEN_KEY=
```
8. Set ```NODE_ENV``` as "dev" for development env and "production" for prod. env
9. Assign any available ```PORT``` number for development env
10. Assign ```MONGO_URI``` for dev and production env respectively
11. Set ```EMAIL``` and ```PASSWORD``` for the website account, which will be used to send confirmation mails
12. Set ```TOKEN_KEY``` as random hash
13. start express server with ```npx nodemon index.js```

## Contributing

We love contributions. That out of the way, an average
contribution would involve the following:

1. Fork this repository in your account.
2. Clone it on your local machine.
3. Add a new remote using `git remote add upstream https://github.com/pavas23/DaanNetwork`.
4. Create a new feature branch with `git checkout -b my-feature`.
5. Make your changes.
6. Commit your changes.
7. Rebase your commits with `upstream/master`:
  - `git checkout master`
  - `git fetch upstream master`
  - `git reset --hard FETCH_HEAD`
  - `git checkout my-feature`
  - `git rebase master`
8. Resolve any merge conflicts, and then push the branch with `git push origin my-feature`.
9. Create a Pull Request detailing the changes you made and wait for review/merge.

It might seem a little complicated at a glance, but the fundamental concept is simple: we
want to ensure that your changes are always made on top of the latest changes to the
project and thus, we can easily merge your code.

### Commit Message Guidelines

The commit message:

- is written in the imperative (e.g., "Fix ...", "Add ...")
- is kept short, while concisely explaining what the commit does.
- is clear about what part of the code is affected -- often by prefixing with the name of the subsystem and a colon, like "server: ..." or "docs: ...".
- is a complete sentence, ending with a period.


## Team Members
- [Saksham Bajaj](https://github.com/SakshamBajaj18) &nbsp;&nbsp;&nbsp; `(Product Owner + Developer)`
- [Pavas Garg](https://www.github.com/pavas23) &nbsp;&nbsp;&nbsp; `(Scrum Master + Developer)`
- [Dev Gala](https://github.com/devgala) &nbsp;&nbsp;&nbsp; `(Developer)`
- [Pritam Basu](https://github.com/soppydart) &nbsp;&nbsp;&nbsp; `(Developer)`
- [Vani Jain](https://github.com/vanijain07) &nbsp;&nbsp;&nbsp; `(Developer)`
