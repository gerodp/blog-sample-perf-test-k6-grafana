import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  scenarios: {
    read_posts_stress_test: {
      executor: 'ramping-arrival-rate',

      // Our test with at a rate of 50 iterations started per `timeUnit` (e.g minute).
      startRate: 50,

      // It should start `startRate` iterations per second
      timeUnit: '1m',

      // It should preallocate 300 VUs before starting the test.
      preAllocatedVUs: 300,

      // It is allowed to spin up to 5000 maximum VUs in order to sustain the defined
      // constant arrival rate.
      maxVUs: 5000,

      stages: [
        { target: 25*60, duration: '1m' },
        { target: 25*60, duration: '2m' },
        { target: 50*60, duration: '1m' },
        { target: 50*60, duration: '2m' },
        { target: 100*60, duration: '1m' },
        { target: 100*60, duration: '2m' },
        { target: 150*60, duration: '1m' },
        { target: 150*60, duration: '2m' },
        { target: 25*60, duration: '3m' },
      ],
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

