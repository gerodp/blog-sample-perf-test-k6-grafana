import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  scenarios: {
    read_posts_constant: {
      executor: 'constant-arrival-rate', 

      // Our test should last 10 minutes in total
      duration: '600s',

      // It should start 20 iterations per `timeUnit`. Note that iterations starting points
      // will be evenly spread across the `timeUnit` period.
      rate: 110,

      // It should start `rate` iterations per second
      timeUnit: '1s',

      // It should preallocate 25 VUs before starting the test
      preAllocatedVUs: 120,

      // It is allowed to spin up to 40 maximum VUs to sustain the defined
      // constant arrival rate.
      maxVUs: 140,
    }
  }
};

//This function runs only once per Test
export function setup() {
  let loginParams = { username: 'testint1', password: 'testint1'};

  let loginRes = http.post(__ENV.SERVICE_URL+'/login', JSON.stringify(loginParams), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(loginRes, {
    "status is 200": (r) => r.status == 200,
  });

  return { token: loginRes.json().token };
}

export default function(data) {

  const token = data.token;

  let resp = http.get(__ENV.SERVICE_URL+"/auth/post?page_size=5",{
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
     },
  });

  check(resp, {
    "status is 200": (r) => r.status == 200,
  });

  sleep(1);
}

