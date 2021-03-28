npm install
nodemon index.js
http://localhost:8081/processAssetList

Input Payload:
[
  {
    id: '100001',
    title: 'asset 1',
    description: 'this is asset 1',
    broadcastStartTime: '2020-02-16T02:48:28Z',
    duration: 1000,  
    image: 'https://image.domain1.com/cms/assets/100001.jpg',
    match: {
      id: 'matchId200001',
      homeTeam: {
        id: 'teamId00001',
        name: 'team 000001',
        image: 'https://image.domain1.com/cms/teams/100001.jpg',
        address: "team 00001 address"
      },
      awayTeam: {
        id: 'teamId00002',
        name: 'team 000002',
        image: 'https://image.domain1.com/cms/teams/100002.jpg'
      }
    },
    tags: ['tag1', 'tag2'],
    updateAt: '2019-02-16T02:48:28Z',
    type: 'minimatch'
  },
  {
    id: '100002',
    title: 'asset 2',
    description: 'this is asset 2',
    image: 'https://image.domain1.com/cms/assets/100002.jpg',
    broadcastStartTime: '2018-02-16T02:48:28Z',
    duration: 60000,
    tags: ['tag1', 'tag2'],
    updateAt: '2019-02-16T02:48:28Z',
    type: 'minimatch'
  },
  {
    id: '100003',
    image: 'https://image.domain1.com/cms/assets/100003.jpg',
    broadcastStartTime: '2018-02-16T02:48:28Z',
    duration: 60000,
    tags: ['tag1', 'tag2'],
    updateAt: '2019-02-16T02:48:28Z',
    type: 'minimatch'
  },
  {
    id: '100004',
    title: 'asset 4',
    description: 'this is asset 4',
    broadcastStartTime: '2022-02-16T02:48:28Z',
    duration: 81000,
    image: 'https://image.domain1.com/cms/assets/100004.jpg',
    match: {
      homeTeam: {
        id: 'teamId00006',
        image: 'https://image.domain1.com/cms/teams/100006.jpg'
      },
      awayTeam: {
        id: 'teamId00009',
        name: 'team 000009',
        image: 'https://image.domain1.com/cms/teams/100009.jpg'
      }
    },
    tags: ['tag1', 'tag2'],
    updateAt: '2019-02-16T02:48:28Z',
    type: 'minimatch'
  }
]

Expected Output:
[
    {
        "id": "100002",
        "title": "asset 2",
        "description": "this is asset 2",
        "image": "https://cms.domain2.com/assets/100002.jpg",
        "broadcastStartTime": "2018-02-16T02:48:28Z",
        "duration": 60000,
        "broadcastEndTime": "2018-02-16T19:28:28.000Z"
    },
    {
        "id": "100001",
        "title": "asset 1",
        "description": "this is asset 1",
        "broadcastStartTime": "2020-02-16T02:48:28Z",
        "duration": 1000,
        "image": "https://cms.domain2.com/assets/100001.jpg",
        "match": {
            "id": "matchId200001",
            "homeTeam": {
                "id": "teamId00001",
                "name": "team 000001",
                "image": "https://image.domain1.com/cms/teams/100001.jpg"
            },
            "awayTeam": {
                "id": "teamId00002",
                "name": "team 000002",
                "image": "https://image.domain1.com/cms/teams/100002.jpg"
            }
        },
        "broadcastEndTime": "2020-02-16T03:05:08.000Z"
    },
    {
        "id": "100004",
        "title": "asset 4",
        "description": "this is asset 4",
        "broadcastStartTime": "2022-02-16T02:48:28Z",
        "duration": 81000,
        "image": "https://cms.domain2.com/assets/100004.jpg",
        "broadcastEndTime": "2022-02-17T01:18:28.000Z"
    }
]