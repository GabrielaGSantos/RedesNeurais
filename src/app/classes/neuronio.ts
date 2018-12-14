export class Neuron {

    constructor(public id: number, public layer: any, public bias: any) {
        this.id = id;
        this.layer = layer;
        this.bias = bias || 0;
        // this.dropped = false;
        // this.output = undefined;
        // this.error = undefined;
        // this.activation = undefined;
        // this.derivative = undefined;
    }
}