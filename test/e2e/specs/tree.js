module.exports = {
  'tree': function (browser) {
    browser
    .url('http://localhost:8080/examples/tree/')
      .waitForElementVisible('li', 1000)
      .assert.count('.item', 12)
      .assert.count('.add', 4)
      .assert.count('.item > ul', 4)
      .assert.notVisible('#index li ul')
      .assert.containsText('#index li div span', '[+]')

      // expand root
      .click('.bold')
      .assert.visible('#index ul')
      .assert.evaluate(function () {
        return document.querySelector('#index li ul').children.length === 4
      })
      .assert.containsText('#index li div span', '[-]')
      .assert.containsText('#index > .item > ul > .item:nth-child(1)', 'hello')
      .assert.containsText('#index > .item > ul > .item:nth-child(2)', 'wat')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', 'child folder')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', '[+]')

      // add items to root
      .click('#index > .item > ul > .add')
      .assert.evaluate(function () {
        return document.querySelector('#index li ul').children.length === 5
      })
      .assert.containsText('#index > .item > ul > .item:nth-child(1)', 'hello')
      .assert.containsText('#index > .item > ul > .item:nth-child(2)', 'wat')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', 'child folder')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', '[+]')
      .assert.containsText('#index > .item > ul > .item:nth-child(4)', 'new stuff')

      // add another item
      .click('#index > .item > ul > .add')
      .assert.evaluate(function () {
        return document.querySelector('#index li ul').children.length === 6
      })
      .assert.containsText('#index > .item > ul > .item:nth-child(1)', 'hello')
      .assert.containsText('#index > .item > ul > .item:nth-child(2)', 'wat')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', 'child folder')
      .assert.containsText('#index > .item > ul > .item:nth-child(3)', '[+]')
      .assert.containsText('#index > .item > ul > .item:nth-child(4)', 'new stuff')
      .assert.containsText('#index > .item > ul > .item:nth-child(5)', 'new stuff')

      .click('#index ul .bold')
      .assert.visible('#index ul ul')
      .assert.containsText('#index ul > .item:nth-child(3)', '[-]')
      .assert.evaluate(function () {
        return document.querySelector('#index ul ul').children.length === 5
      })

      .click('.bold')
      .assert.notVisible('#index ul')
      .assert.containsText('#index li div span', '[+]')
      .click('.bold')
      .assert.visible('#index ul')
      .assert.containsText('#index li div span', '[-]')

      .dblClick('#index ul > .item div')
      .assert.count('.item', 15)
      .assert.count('.item > ul', 5)
      .assert.containsText('#index ul > .item:nth-child(1)', '[-]')
      .assert.evaluate(function () {
        const firstItem = document.querySelector('#index ul > .item:nth-child(1)')
        const ul = firstItem.querySelector('ul')
        return ul.children.length === 2
      })
      .end()
  }
}
