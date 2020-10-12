#JSON Server
https://github.com/typicode/json-server

```
npm install json-server --save-dev
```

create a db.json file

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" },
    { "id": 2, "title": "json-server 2", "author": "typicode 2" },
    { "id": 3, "title": "json-server 3", "author": "typicode 3" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

in package.json > scripts.js

```
"json-server": "json-server --watch db.json --port 4000 --delay 500"
```

#Axios
https://github.com/axios/axios

```
npm install axios
```

```
const axios = require('axios').default;
```

```
useEffect(() => {
    const fetchData = async () =>
    {
        const response = await axios.get("http://localhost:4000/speakers");
        // const response = await axios.put(`http://localhost:4000/speakers/${ID}`, dataForPUT);

        setSpeakers(response.data);
    }

    fetchData();
}, []);
```

#### Page Loading

```
const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR:'error'
}

const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
const [error, setError] = useState({});

const success = status === REQUEST_STATUS.SUCCESS;
const isLoading = status === REQUEST_STATUS.LOADING;
const hasError = status === REQUEST_STATUS.ERROR;
```

```
useEffect(() => {
    const fetchData = async () =>
    {
        try{
            const response = await axios.get("http://localhost:4000/speakers");
            setSpeakers(response.data);
        }
        catch(e)
        {
            setStatus(REQUEST_STATUS.ERROR);
            setError(e);
        }
    }

    fetchData();
}, []);
```
