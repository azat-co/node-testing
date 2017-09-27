const {expect} = require('chai'),
    {escape, unescape} = require('../index.js')();

describe('#escape', () => {
  it('converts & into &amp;', () => {
    expect(escape('&')).equal('&amp;');
  });

  it('converts " into &quot;', () => {
    expect(escape('"')).equal('&quot;');
  });

  it('converts \' into &#39;', () => {
    expect(escape('\'')).equal('&#39;');
  });

  it('converts < into &lt;', () => {
    expect(escape('<')).equal('&lt;');
  });

  it('converts > into &gt;', () => {
    expect(escape('>')).equal('&gt;');
  });
});

describe('#unescape', () => {
  it('converts &amp; into &', () => {
    expect(unescape('&amp;')).equal('&');
  });

  it('converts &quot; into "', () => {
    expect(unescape('&quot;')).equal('"');
  });

  it('converts &#39; into \'', () => {
    expect(unescape('&#39;')).equal('\'');
  });

  it('converts &lt; into <', () => {
    expect(unescape('&lt;')).equal('<');
  });

  it('converts &gt; into >', () => {
    expect(unescape('&gt;')).equal('>');
  });
});