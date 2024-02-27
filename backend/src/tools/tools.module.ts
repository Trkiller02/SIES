import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { RelationsTableModule } from 'src/relations-table/relations-table.module';
import { StudentModule } from 'src/student/student.module';
import { RepresentModule } from 'src/represent/represent.module';
import { UserModule } from 'src/user/user.module';
import { FichaModule } from 'src/ficha/ficha.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    RelationsTableModule,
    FichaModule,
    RepresentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
