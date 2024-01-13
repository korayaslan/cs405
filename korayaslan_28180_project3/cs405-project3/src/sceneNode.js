/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Compute the transformation matrix for this node
        let localTransformationMatrix = this.trs.getTransformationMatrix();
    
        // Apply the current node's transformation to the matrices passed from the parent
        var transformedModel = MatrixMult(modelMatrix, localTransformationMatrix);
        var transformedModelView = MatrixMult(modelView, localTransformationMatrix);
        var transformedNormals = getNormalMatrix(transformedModelView); // Ensure you have a function to compute the normal matrix
        var transformedMvp = MatrixMult(mvp, localTransformationMatrix);
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Recursively call draw on each child
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    

    

}