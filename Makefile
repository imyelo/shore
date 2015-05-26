CONFIG_DIR = "./config"
HOSTNAME = "0.0.0.0"
DEBUG = shore:*
NODE_ENV = "production"

PM2_START = pm2 start pm2.json

FOREVER_UID = "shore"
FOREVER_OUTFILE = "./logs/out.log"
FOREVER_ERRFILE = "./logs/err.log"
FOREVER_LOGFILE = "./logs/log.log"

FOREVER_START = forever start \
	--uid ${FOREVER_UID} \
	-l ${FOREVER_LOGFILE} \
	-o ${FOREVER_OUTFILE} \
	-e ${FOREVER_ERRFILE} \
	-p ./ -a  ./app

# init
init:
	@mkdir -p logs
	@touch ${FOREVER_OUTFILE} ${FOREVER_ERRFILE} ${FOREVER_LOGFILE}
	@mkdir -p data
	@touch ./data/db.sqlite

# server
dev: stop init
	@DEBUG=${DEBUG} HOSTNAME=${HOSTNAME} pm2 start ./pm2.json
	@pm2 logs

stop:
	-forever stop ${FOREVER_UID}
	-pm2 flush
	-pm2 kill
