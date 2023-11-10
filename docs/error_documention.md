# Project Team 5 Documentation
## **Usage**
### Run website locally
1. Git pull all files from the repo
2. Change directory to `app\amplifyapp`
3. Run `npm install` to install all the node modules locally
4. Run `amplify init` to initialize amplify (if you want the backend to work)
5. Run `amplify pull` to update your local backend environment (if you want the backend to work)
6. Run `npm start` 
7. The website should open in your browser on localhost:3000

## **JS Documentation**
### View documentation
1. Open the file `amplifyapp/docs/index.html`

### Update documentation
1. Run the command `npm docs`
   1. If there are any problems it probably has to do with the `jsdoc` library
2. The new documentation will be generated in `amplifyapp/docs`

## **Front End**
### Components
### Issues
#### Issue #1 - xxx is not a <Route> component.
**Problem**: When running `npm start` or trying to build the front end, the following react-router error is thrown
![image](https://images-ext-2.discordapp.net/external/SFdkIW5v7oOzAwbxW3FbNRp12jkPZ9ObKKd-jTVa0BI/https/i.imgur.com/4l6IXo6.png?width=1155&height=670)

**Solution**: react-router V5 uses the  `<Router>` and `<Routes>` tags. In the newest version the library no longer uses those tags

#### Issue #1 - The Josh Problem
## **Backend/AWS**
### Issues
#### Issue #1 - The Josh Problem
**Problem**: amplify commands error out after running amplify pull, the error shows a non-existent directory

**Solution**: run `amplify init` with default arguments
![image](https://github.com/COSC-499-W2023/year-long-project-team-5/assets/79242419/44de7542-fe4a-42fe-985f-e2a225f7c54b)

#### Issue #2 - User pool error
**Problem:** An error message is thrown when logging in: user pool xxxx does not exist

**Solution:**
1. Run `amplify update auth`
2. Choose apply default configuration with social provider (non-federation)
    1. Note: This will reset all of the auth settings to default


  
#### Issue #3 - Git ignore not working
**Problem:** Git is showing files to commit that are in the git ignore

**Solution:**
1. Run `git rm -rf --cached .`
2. `git add .`
3. `git commit -m "fixed untracked files"` or just use github desktop
4. GG

