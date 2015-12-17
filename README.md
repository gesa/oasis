# To the oasis!

## Running the server, building the site

### Dependencies:
- Ruby 2.1.0 (probably managed by [rbenv](https://github.com/sstephenson/rbenv)
or rvm)
- Node > 0.10.0
- [Bundler](http://bundler.io)

### Install:

```bash
npm install
```

### Run:

```bash
npm start
```

### Test:

("test" is a generous description of this function)

```bash
npm test
```

### Deploy:

Deploy to S3 using travis by running `travis setup s3` on the command line


## TODO

- Save logo file, then update the following with fully qualified url
    - [ ] `og:image` (don’t forget dimensions)
    - [ ] `twitter:image:src`
    - [ ] `itemprop="image"`
