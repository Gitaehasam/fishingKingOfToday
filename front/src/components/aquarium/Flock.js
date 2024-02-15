import {
    useFrame
} from "@react-three/fiber";
import {
    Vector3
} from "three";

export class Boid {
    constructor() {
        this.position = new Vector3(0, 0, 0);

        const maxVelocity = 0.1;
        const randomVelocity = Math.random() * maxVelocity;
        this.velocity = new Vector3(0, 0, 0);
        this.velocity.randomDirection();
        this.velocity.multiplyScalar(randomVelocity);

        this.acceleration = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(0, 0, 0);
        
        this.maxVelocity = 0.06;
        this.maxDistance = 1.5;
        this.maxForceAlignment = 0.001;
        this.maxForceSeparation = 0.001;
        this.maxForceCohesion = 0.001;
        this.maxSpeedAlignment = 2;
        this.maxSpeedSeparation = 6;
        this.maxSpeedCohesion = 0.1;
    }

    calculateFlocking(boids) {
        let averageVelocity = new Vector3(0, 0, 0);
        let averagePositionSeparation = new Vector3(0, 0, 0);
        let averagePositionCohesion = new Vector3(0, 0, 0);

        let total = 0;

        for (let other of boids) {
            const distance = other.position.distanceTo(this.position);

            if (other === this || distance > this.maxDistance) continue;

            const otherVelocity = new Vector3(other.velocity.x, other.velocity.y, other.velocity.z);
            averageVelocity.add(otherVelocity);

            const differenceSeparation = new Vector3(this.position.x, this.position.y, this.position.z);
            differenceSeparation.sub(other.position);
            differenceSeparation.divideScalar(distance * distance)
            averagePositionSeparation.add(differenceSeparation);

            const otherPosition = new Vector3(other.position.x, other.position.y, other.position.z);
            averagePositionCohesion.add(otherPosition);

            total++;
        }

        const force = new Vector3(0, 0, 0);

        if (total > 0) {
            averageVelocity.divideScalar(total);
            averageVelocity.setLength(this.maxSpeedAlignment);
            averageVelocity.sub(this.velocity);
            averageVelocity.clampLength(0, this.maxForceAlignment);

            averagePositionSeparation.divideScalar(total);
            averagePositionSeparation.setLength(this.maxSpeedSeparation);
            averagePositionSeparation.sub(this.position);
            averagePositionSeparation.clampLength(0, this.maxForceSeparation);

            averagePositionCohesion.divideScalar(total);
            averagePositionCohesion.setLength(this.maxSpeedCohesion);
            averagePositionCohesion.sub(this.position);
            averagePositionCohesion.clampLength(0, this.maxForceCohesion);

            force.add(averageVelocity);
            force.add(averagePositionSeparation);
            force.add(averagePositionCohesion);
        }

        return force;
    }

    flock(boids) {
        const flockingForce = this.calculateFlocking(boids);
        this.acceleration.add(flockingForce);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(0, this.maxVelocity);

        const vectorFromZero = new Vector3(this.position.x, this.position.y - 5, this.position.z);
        const vectorFromZeroLength = vectorFromZero.length();
        vectorFromZero.multiplyScalar(-1);
        if (vectorFromZeroLength !== 0 && vectorFromZeroLength > 10) {
            vectorFromZero.divideScalar(10000);
            vectorFromZero.y = vectorFromZero.y * 2;
            this.velocity.add(vectorFromZero);
        }

        this.position.add(this.velocity);

        this.acceleration = new Vector3(0, 0, 0);
    }
}

export class Flock {
    constructor(amountOfBoids) {
        this.boids = [];

        this.maxDistance = 1.5;
        this.maxSpeedAlignment = 2;
        this.maxSpeedSeparation = 6;
        this.maxSpeedCohesion = 0.1;
        this.amountOfBoids = amountOfBoids;

        this.initialize();
    }

    initialize() {
        const distance = 25;
        const distanceY = 20;

        for (let i = 0; i < this.amountOfBoids; i++) {
            const randomScale = Math.random() * 0.75 + 0.2;

            const position = new Vector3(
                Math.random() * distance - distance / 2,
                Math.random() * distanceY - 5,
                Math.random() * distance - distance / 2
            );
            const rotation = new Vector3(
                Math.random() * 0.5,
                Math.random() * 360,
                Math.random() * 0.5
            );
            const scale = new Vector3(randomScale, randomScale, randomScale);
            
            const boid = new Boid();
            boid.position = position;
            boid.rotation = rotation;
            boid.scale = scale;

            this.boids.push(boid);
        }
    }

    update() {
        if (!this.boids) return;

        this.boids.forEach(boid => {
            boid.maxSpeedAlignment = this.maxSpeedAlignment;
            boid.maxSpeedCohesion = this.maxSpeedCohesion;
            boid.maxSpeedSeparation = this.maxSpeedSeparation;
            boid.maxDistance = this.maxDistance;
            boid.flock(this.boids);
        });

        this.boids.forEach(boid => {
            boid.update();
        });
    }
    ;
}