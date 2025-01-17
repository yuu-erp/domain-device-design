import { RepositoryPort } from "../../../../core/domain/repository/repository.port";
import { DappEntity } from "../entities/dapp.entity";

export interface DappRepository extends RepositoryPort<DappEntity> {}
