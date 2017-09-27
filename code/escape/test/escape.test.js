var expect = require('chai').expect,
    {escape, unescape} = require('../index.js')();

describe('#escape', function() {
  it('converts & into &amp;', function() {
    expect(escape('&')).equal('&amp;');
  });

  it('converts " into &quot;', function() {
    expect(escape('"')).equal('&quot;');
  });

  it('converts \' into &#39;', function() {
    expect(escape('\'')).equal('&#39;');
  });

  it('converts < into &lt;', function() {
    expect(escape('<')).equal('&lt;');
  });

  it('converts > into &gt;', function() {
    expect(escape('>')).equal('&gt;');
  });
});

describe('#unescape', function() {
  it('converts &amp; into &', function() {
    expect(unescape('&amp;')).equal('&');
  });

  it('converts &quot; into "', function() {
    expect(unescape('&quot;')).equal('"');
  });

  it('converts &#39; into \'', function() {
    expect(unescape('&#39;')).equal('\'');
  });

  it('converts &lt; into <', function() {
    expect(unescape('&lt;')).equal('<');
  });

  it('converts &gt; into >', function() {
    expect(unescape('&gt;')).equal('>');
  });
});