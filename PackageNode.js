/**
 * Declaration of a hard object for a package node
 * This hard object "inherits" from the framework class Rectangular Node
 * @extends createRectangularNode
 * @constructor
 * @return properties of a package node
 */
function createPackageNode() {
  let superRecNode = createRectangularNode()

  let properties = {
    name: undefined,
    contents: undefined,
  }
  let originalHeight = undefined

  return {
    /**
     * Calls the superclass to get the rectangular bounds of this node
     * @return {Object} the bounds
     * @memberof createPackageNode
     */
    getBounds: () => {
      return superRecNode.getBounds()
    },
    /**
     * Calls the superclass to set the rectangular bounds of this node and stores the height
     * @param {Object} rect the new bounds
     * @memberof createPackageNode
     */
    setBounds: (rect) => {
      superRecNode.setBounds(rect)
      originalHeight = superRecNode.getHeight()
    },
    /**
     * Calls the superclass to check if a given point is within this node
     * @param {Object} p the point
     * @return {Object} the bounds
     * @memberof createPackageNode
     */
    contains: p => {
      return superRecNode.contains(p)
    },
    /**
     * Calls the superclass to translate this node
     * @param {number} dx the amount to translate by in the x direction
     * @param {number} dy the amount to translate by in the y direction
     * @memberof createPackageNode
     */
    translate: (dx, dy) => {
      superRecNode.translate(dx, dy)
    },
    /**
     * Gets the properties of this node
     * @return {Object} the properties
     * @memberof createPackageNode
     */
    getProperties: () => {
      return properties
    },
    /**
     * Sets the properties of this node
     * @param {Object} newProperties the new properties
     * @memberof createPackageNode
     */
    setProperties: (newProperties) => {
      properties = newProperties
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the superclass type
     * @memberof createPackageNode
     */
    getTypeOfSuperClass: () => {
      return superRecNode.getType()
    },
    /**
     * Returns its type
     * @return {string} the type
     * @memberof createPackageNode
     */
    getLocalType: () => {
      return 'PACKAGE_NODE'
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createPackageNode
     */
    clone: () => {
      return createPackageNode()
    },
    /**
     * Draws the package node using canvas
     * @memberof createPackageNode
     */
    draw: () => {
      let x = superRecNode.getX()
      let y = superRecNode.getY()
      let height = originalHeight
      let width = superRecNode.getWidth()

      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')

      let firstThirdY = y + height / 3

      if (properties.name === undefined) {
        ctx.rect(x, y, width / 1.5, height / 4)
        ctx.rect(x, y + height / 4, width, height - height / 4)
      }

      if (properties.contents === undefined) {
        ctx.rect(x, y, width / 1.5, height / 4)
        ctx.rect(x, y + height / 4, width, height - height / 4)
      }

      // Add text to the correct location
      if (properties.name !== undefined) {
        const packageName = properties.name[0]

        if (ctx.measureText(packageName).width > width / 1.5) {
          width = ctx.measureText(packageName).width + 20
        }

        ctx.rect(x, y, width, height / 4)
        ctx.fillText(packageName, x + 5, y + 15)
        ctx.stroke()
      }

      if (properties.contents !== undefined) {
        let propertyContents = properties.contents
        let offset = 20

        for (let i = 0; i < propertyContents.length; i++) {
          let line = propertyContents[i]

          if (ctx.measureText(line).width > width) {
            width = ctx.measureText(line).width + 20
          }

          ctx.rect(x, y + height / 4, width + 20, height - height / 4)

          ctx.fillText(line, x + 5, firstThirdY + offset)
          offset += 10
          ctx.stroke()
        }
      }
      ctx.stroke()

      // Draw line at bottom of first third of package node
      // ctx.beginPath
      // ctx.style
      // ctx.moveTo(x, firstThirdY)
      // ctx.lineTo(x+width, firstThirdY)
      // ctx.moveTo(x+(width/2), y)
      // ctx.lineTo(x+(width/2),firstThirdY)
      // ctx.stroke();
      // Draws the package name rectangle
      //ctx.rect(x, y, width / 1.5, height / 4)
      // Draws the package contents rectangle
      // ctx.rect(x, y + height / 4, width, height - height / 4)
      //ctx.setLineDash([])

    }

  }
}