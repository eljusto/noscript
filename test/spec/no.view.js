describe('no.View', function() {

    describe('no.View.define', function() {

        beforeEach(function() {
            sinon.spy(no.View, 'define');
        });

        afterEach(function() {
            no.View.define.restore();
        });

        it('should throw exception if I define View twice', function() {
            no.View.define('test-view-define-twice');
            try {
                no.View.define('test-view-define-twice');
            } catch(e) {}

            expect(no.View.define.getCall(1).threw()).to.be.ok();
        });
    });

    describe('no.View.info events parse', function() {

        no.View.define('test-view-info-events-parse', {
            events: {
                'scroll window': no.pe,
                'scroll document': no.pe,
                'resize window': no.pe,
                'resize document': no.pe,
                'scroll .foo': no.pe,
                'scroll': no.pe,
                'click': no.pe,
                'click .bar': no.pe
            },
            noevents: {
                'init': {
                    '* myglobalinitevent': no.pe,
                    'mylocalinitevent': no.pe
                },
                'show': {
                    '* myglobalshowevent': no.pe,
                    'mylocalshowevent': no.pe
                }
            }
        });

        beforeEach(function() {
            this.viewInfo = no.View.info('test-view-info-events-parse');
        });

        afterEach(function() {
            delete this.viewInfo;
        });

        describe('DOM events', function() {

            it('"initEvents" should be the object', function() {
                expect(this.viewInfo.initEvents).to.be.a('object');
            });

            it('"initEvents.bind" should be the array', function() {
                expect(this.viewInfo.initEvents['bind']).to.be.a('array');
            });

            it('"initEvents.delegate" should be the array', function() {
                expect(this.viewInfo.initEvents['delegate']).to.be.a('array');
            });

            it('"showEvents" should be the array', function() {
                expect(this.viewInfo.showEvents).to.be.a('array');
            });

            it('should parse delegated init events properly', function() {
                expect(this.viewInfo.initEvents['delegate']).to.be.eql([
                    ['scroll', '', no.pe],
                    ['click', '', no.pe],
                    ['click', '.bar', no.pe]
                ]);
            });

            it('should parse bind init events properly', function() {
                expect(this.viewInfo.initEvents['bind']).to.be.eql([
                    ['scroll', '.foo', no.pe]
                ]);
            });

            it('should parse show events properly', function() {
                expect(this.viewInfo.showEvents).to.be.eql([
                    ['scroll', 'window', no.pe],
                    ['scroll', 'document', no.pe],
                    ['resize', 'window', no.pe],
                    ['resize', 'document', no.pe]
                ]);
            });
        });

        describe('no.events', function() {
            it('"initNoevents" should be the object', function() {
                expect(this.viewInfo.initNoevents).to.be.a('object');
            });

            it('"initNoevents.global" should be the array', function() {
                expect(this.viewInfo.initNoevents['global']).to.be.a('array');
            });

            it('"initNoevents.local" should be the array', function() {
                expect(this.viewInfo.initNoevents['local']).to.be.a('array');
            });

            it('"showNoevents" should be the object', function() {
                expect(this.viewInfo.showNoevents).to.be.a('object');
            });

            it('"showNoevents.global" should be the array', function() {
                expect(this.viewInfo.showNoevents['global']).to.be.a('array');
            });

            it('"showNoevents.local" should be the array', function() {
                expect(this.viewInfo.showNoevents['local']).to.be.a('array');
            });

            it('should parse global init noevents properly', function() {
                expect(this.viewInfo.initNoevents['global']).to.be.eql([
                    ['myglobalinitevent', no.pe]
                ]);
            });

            it('should parse local init noevents properly', function() {
                expect(this.viewInfo.initNoevents['local']).to.be.eql([
                    ['mylocalinitevent', no.pe]
                ]);
            });

            it('should parse global show noevents properly', function() {
                expect(this.viewInfo.showNoevents['global']).to.be.eql([
                    ['myglobalshowevent', no.pe]
                ]);
            });

            it('should parse local show noevents properly', function() {
                expect(this.viewInfo.showNoevents['local']).to.be.eql([
                    ['mylocalshowevent', no.pe]
                ]);
            });
        });
    });
});