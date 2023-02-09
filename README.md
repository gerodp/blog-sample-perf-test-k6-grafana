# Blog Sample Backend API - Performance Tests

Performance Tests for a sample blog app (https://github.com/gerodp/blog-sample-backend-go-grafana.git) and intended to be used to support the Blog article about performance testing [TODO PASTE URL HERE].

The project was tested succesfully on Mac with M1 Chip and Linux with amd64 architectures.

For covenience we include a Makefile with commands to ease local development.

To launch the tests run the following command:

```
API_URL=http://api_to_test_url TEST=testfile.js make start 
```

The following services will be started:

- k6: Container that actively listen to changes in TEST file and automatically re-launch them with k6
- prometheus: Monitoring backend that will collect the metrics from backend
- grafana: Monitoring frontend with dashboards to check different metrics

To access Grafana open a browser and navigate to http://localhost:3000

To access Prometheus open a browser and navigate to http://localhost:9090


## Deployment in AWS EC2

* Create AWS EC2 preferebly with Ubuntu Linux and x86 compatible CPU (Tested with t3.large and m5.large)

```

sudo apt install make

sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker ubuntu

sudo docker run hello-world

# Log out and log in again

git clone git@github.com:gerodp/blog-sample-perf-test-k6-grafana.git

cd blog-sample-perf-test-k6-grafana

API_URL=http://api_to_test_url TEST=testfile.js make start 

```
