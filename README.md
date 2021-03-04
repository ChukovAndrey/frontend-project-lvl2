### Hexlet tests and linter status:
[![hexlet-check](https://github.com/ChukovAndrey/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ChukovAndrey/frontend-project-lvl2/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/ChukovAndrey/frontend-project-lvl2/actions/workflows/custom-ci.yml/badge.svg)](https://github.com/ChukovAndrey/frontend-project-lvl2/actions/workflows/custom-ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://github.com/ChukovAndrey/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8ebbb570482ba01af18f/test_coverage)](https://codeclimate.com/github/ChukovAndrey/frontend-project-lvl2/test_coverage)

## Description:

Difference generator (generates difference between json/yaml files in various formats)
## Setup:
```
git clone https://github.com/ChukovAndrey/frontend-project-lvl2.git
```
```
cd frontend-project-lvl2
```
```
make install
```
## Usage:
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```
## Examples:
### Stylish output:
[JSON files](https://asciinema.org/a/e2cNTN0ZkMNJuLwPCaO5qJeZr)

[YAML files](https://asciinema.org/a/TFzYN1wspkZYoB03eSuaYQ2AF)
### Plain output:
[JSON files](https://asciinema.org/a/nTdRQAFekQpmWruLLLlRljjTh)

[YAML files](https://asciinema.org/a/NqyfZV7DGfsIscjU3WBAHOx6y)

### JSON output:
[JSON files](https://asciinema.org/a/Fg2X8IzeJG7K5gVMeCei9ml4y)

[YAML files](https://asciinema.org/a/YCLL3QvbLHwImCBvR7CNJ3tf6)