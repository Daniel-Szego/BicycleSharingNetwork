import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bicyclesharing.model{
   export enum AvailabilityEnum {
      FREE,
      NOT_AVAILABLE,
      HIRED,
   }
   export enum StateEnum {
      GOOD,
      IMPAIRED,
      FAULTY,
   }
   export enum ColorEnum {
      WHITE,
      BLACK,
      BLUE,
      GREEN,
      GREY,
      RED,
   }
   export enum BikeEnum {
      SPORT,
      CHOPPER,
      SCOOTER,
   }
   export class Wheel {
      Size: number;
      TireType: string;
   }
   export class Engine {
      EngineType: string;
      EngineDescription: string;
   }
   export class Address {
      Country: string;
      City: string;
      Street: string;
      HauseNumber: number;
   }
   export abstract class HireableAsset extends Asset {
      ObjectID: string;
      ObjectName: string;
      AssetAvailability: AvailabilityEnum;
      AssetSate: StateEnum;
      Owner: AssetOwner;
      HiredBy: User;
   }
   export class Bycicle extends HireableAsset {
      BicycleWheel: Wheel;
      BicycleColor: ColorEnum;
   }
   export class Bike extends HireableAsset {
      BikeType: BikeEnum;
      BicycleColor: ColorEnum;
   }
   export abstract class Actor extends Participant {
      ActorID: string;
      AccountBalance: number;
   }
   export class User extends Actor {
      UserName: string;
      UserAddress: Address;
   }
   export class AssetOwner extends Actor {
      OwnerName: string;
      OwnerAddress: Address;
   }
   export class InitTestData extends Transaction {
   }
   export class ClearData extends Transaction {
   }
   export class HireBycicle extends Transaction {
      BycicleToHire: Bycicle;
      HireByMe: User;
   }
   export class NeedRepair extends Transaction {
      BycicleToRepair: Bycicle;
   }
   export class Repaired extends Transaction {
      BycicleToRepair: Bycicle;
   }
   export class BycicleHiredEvent extends Event {
      BycicleName: string;
      HiringPersonName: string;
   }
// }
