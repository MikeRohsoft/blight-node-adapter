const Ironhelmet = require('ironhelmet');

class Blight extends Ironhelmet {
    /** */
    constructor() {
        super('blight');
        this.creditsBuffer = 0;
        this.account = {};
        const loadHandler = b => {
            if (!b) {
                return;
            }
            const promiseHandle = ([,accObj]) => {
                this.account = accObj;
                this.fire('ready', this.account);
            };
            this.initAccount().then(promiseHandle); 
        };
        this.on('load', loadHandler);
    }

    haveIWon() {
        return new Promise(res => {
            if (!this.creditsBuffer) {
                res(false);
            }
            const currentBadges = this.creditsBuffer;
            this.updateCreditsBuffer().then(bool => {
                if (!bool) {
                    console.log(`error handling`);
                    res(false);
                }
                res(currentBadges != this.creditsBuffer);
            });
        });
    }

    /**
     * Buys a place
     * @param {string | number} gameNumber
     * @param {number} unitNumber
     * @param {number} [age] 0 if omitted
     * @param {function(Object): void} [callback] return Promise if omitted
     * @returns {Promise<Object> | void} 
     */
    buyPlace(gameNumber, unitNumber, age, callback) {
        age |= 0;
        return this.order(gameNumber, ['buy_place', unitNumber, 'send_feedback'], callback);
    }

    /**
     * Squash the Units to an Army
     * @param {string | number} gameNumber
     * @param {number} unitNumber
     * @param {number} [age] 0 if omitted
     * @param {function(Object): void} [callback] return Promise if omitted
     * @returns {Promise<Object> | void} 
     */
    gatherAll(gameNumber, unitNumber, age, callback) {
        age |= 0;
        const params = {
            age: age,
            build_number: 1052,
            game_number: gameNumber,
            order: `gather_all,${unitNumber}`,
            type: 'order',
        };
        return this.order(gameNumber, ['gather_all', unitNumber], callback);
    }

    /**
     * @returns {Promise<boolean>}
     */
    updateCreditsBuffer() {
        return new Promise(res => {
            this.collection().then(collectionObj => {
                if (!collectionObj) {
                    console.log(`error handling`);
                    res(false);
                }
                this.creditsBuffer = collectionObj.credits;
                res(true);
            });
        });
    }

    /**
     * this happens immidiatly after login
     * @param {function(string, AccountObject): void} [callback] return Promise if omitted
     * @returns {Promise<string, AccountObject> | void}
     */
	initAccount(callback) {
		const url = `${this.url}/mrequest/init_account`;
		const parameters = {
			type: 'init_account',
		};
		return this.returnFunc(url, parameters, callback);
    }

    /**
     * Filter the Game Objects by status active
     * @returns {Array<GameObject>}
     */
    getActiveGames() {
        const result = [];
        for (let i = 0, v; v = this.account.games[i]; i++) {
            if (v.status === 'active') {
                result.push(v);
            }
        }
        return result;
    }

    /**
     * Creates a Single Player Game in Tutorial Mode
     * @param {'first' | 'second' | 'third'} [kind='first']
     * @param {function(string, GameObject): void} [callback]
     * @returns {Promise<string, GameObject> | void} 
     */
    createTutorialGame(kind, callback) {
        const config = {
            kind: kind, 
            tutorial: true, 
            difficulty: '1',
        };
        return this.createSPGame(config, callback);
    }

    /**
     * Creates a Single Player Game
     * @param {ConfigObject} config 
     * @param {function(string, GameObject): void} [callback]
     * @returns {Promise<string, GameObject> | void} 
     */
    createSPGame(config, callback) {
		const url = `${this.url}/mrequest/create_sp_game`;
		const parameters = {
            type: 'create_sp_game',
            config: JSON.stringify(config),
        };
		return this.returnFunc(url, parameters, callback);
    }

    /**
     * checks if it is an Array<Array<>> CSV styled Element
     * @param {any} obj 
     * @returns {boolean}
     */
    isBlightObject(obj) {
        let result = 
            typeof obj === 'object'     &&  // it could be an Array<>
            !!obj.find                  &&  // it is an Array<> \o/
            !!obj[0]                    &&  // has it Elements?
            typeof obj[0] === 'object'  &&  // it could be an Array<Array<>>
            !!obj[0].find               &&  // it is an Array<Array<>> \o/
            obj[0].length > 1;              // has it more then one Elemnts?
        if (!result) {
            return result;
        }
        // To make it more sure we check if the first row are all filled with strings or more arrays
        for (let i = 0, v; v = obj[0][v]; i++) {
            if (typeof v === 'string' || (typeof v === 'object' && !!v.find)) {
                continue;
            }
            result = false;
            break;
        }
        return result;
    }

    /**
     * @param {any} key 
     * @param {any} value 
     * @returns {boolean}
     */
    isBlightSubObjectPair(key, value) {
        return  typeof key === 'object'     && 
                typeof value === 'object'   &&
                !!value.find                &&
                key.length === 2            &&
                typeof key[0] === 'string'  &&
                typeof key[1] === 'object'  &&
                !!key[1].find;
    }

    /**
     * @param {any} obj 
     */
    fixBlightArray(obj) {
        const out = [];
        for (let i = 1, n; n = obj[i]; i++) {
            const buffer = {};
            for (let j = 0, key, value; value = n[j], key = obj[0][j]; j++) {
                if (!this.isBlightSubObjectPair(key, value)) {
                    buffer[key] = value;
                    continue;
                }
                buffer[key[0]] = {}
                for (let i = 1, v; v = key[1][i]; i++) {
                    buffer[key[0]][v] = value[i];
                }
            }
            out.push(buffer);
        }
        return out;
    }

    /**
     * fixes the Array<Array<>> CSV stlyled Elements
     * @param {any} obj 
     * @returns {any}
     */
    fixBlightObjects(obj) {
        if (!obj || typeof obj !== 'object' || !!obj.find) {
            throw 'this object is no map';
        }
        for (let k in obj) {
            if (!this.isBlightObject(obj[k])) {
                continue;
            }
            obj[k] = this.fixBlightArray(obj[k]);
        }
        return obj;
    }

    /**
     * Gets the Full Universe Report with fixed Blight Objects
     * @param {string | number} gameNumber 
     * @param {number} [age] is 0 if omitted
     * @param {function(FullUinverseReportObject)} [callback] return Promise if omitted
     * @returns {Promise<FullUinverseReportObject> | void}
     */
    fullUniverseReport(gameNumber, age, callback) {
        age |= 0;
        const result = new Promise((res) => {
            this.order(gameNumber, 'full_universe_report', callback).then(e => {
                if (!!e && e.report) {
                    res(this.fixBlightObjects(e.report));
                }
            });
        });
        if (!!callback && typeof callback === 'function') {
            result.then(callback);
        }
        return result;
    }

    /**
     * Gets the Player Archievements
     * @param {function(CollectionObject): void} [callback] return Promise if omitted
     * @returns {Promise<CollectionObject> | void} 
     */
    collection(callback) {
        const url = `${this.url}/collection`;
		const parameters = {
            type: 'get_collection',
        };
		return new Promise(res => {
            this.returnFunc(url, parameters, callback).then(e => {
                res(this.fixBlightObjects(e));
            });
        });
    }

    /**
     * Turns the Game X Hours further
     * @param {string | number} gameNumber
     * @param {number} [hours] 6 if omitted
     * @param {number} [age] 0 if omitted
     * @param {function(any[]): void} [callback] return Promise if omitted
     * @returns {Promise<string, GameObject> | void} 
     */
    nextTurn(gameNumber, hours, age, callback) {
        hours |= 6;
        age |= 0;
        return this.order(gameNumber, ['next_turn', hours, 'send_feedback'], callback);
    }

    /**
     * Trains units on a specific unit
     * @param {string | number} gameNumber
     * @param {number} unitNumber
     * @param {number} [age] 0 if omitted
     * @param {function(Object): void} [callback] return Promise if omitted
     * @returns {Promise<Object> | void} 
     */
    trainMilitia(gameNumber, unitNumber, age, callback) {
        age |= 0;
        return this.order(gameNumber, ['train_militia', unitNumber], callback);
    }

    /**
     * moves an Hero from A to B
     * @param {string | number} gameNumber 
     * @param {number} unit 
     * @param {Array<number>} waypoints 
     * @param {number} [age] 0 if omitted
     * @param {function(object): void} [callback] return Promise if omitted
     * @returns {Promise<object> | void}
     */
    moveHero(gameNumber, unit, waypoints, age, callback) {
        age |= 0;
        return this.order(gameNumber, ['move_hero', unit, waypoints[waypoints.length - 1], waypoints.join('_'), ' '], callback);
    }

    /**
     * spells a Cast
     * @param {string | number} gameNumber 
     * @param {number} unit 
     * @param {number} target 
     * @param {number} [age] 0 if omitted
     * @param {function(object): void} [callback] return Promise if omitted
     * @returns {Promise<object> | void}
     */
    doPower(gameNumber, unit, target, age, callback) {
        age |= 0;
        return this.order(gameNumber, ['do_power', unit, target, 'send_feedback'], callback);    
    }
    
    /**
     * Buys Gold against Valour
     * @param {string | number} gameNumber 
     * @param {number} [age] 0 if omitted
     * @param {function(object): void} [callback] return Promise if omitted
     * @returns {Promise<object> | void}
     */
    buyGold(gameNumber, age, callback) {
        age |= 0;
        return this.order(gameNumber, ['buy_gold', 10], callback);
    }
}

module.exports = Blight;

