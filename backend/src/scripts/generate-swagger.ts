import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module'; // Your root module
import * as yaml from 'js-yaml'; // YAML support

async function generateSwaggerDocs() {
  const app = await NestFactory.create(AppModule);

  // Create the `docs` directory if it doesn't exist
  const docsDir = './docs';
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir);
  }

  // Swagger/OpenAPI v3 Configuration
  const configV3 = new DocumentBuilder()
    .setTitle('API Documentation (OpenAPI v3)')
    .setDescription('Generated API documentation for OpenAPI v3')
    .setVersion('3.0')
    .build();

  // Generate Swagger v3
  const documentV3 = SwaggerModule.createDocument(app, configV3);
  writeFileSync(
    `${docsDir}/swagger-v3.json`,
    JSON.stringify(documentV3, null, 2),
  );
  writeFileSync(`${docsDir}/swagger-v3.yaml`, yaml.dump(documentV3));

  // Swagger/OpenAPI v2 Configuration
  const configV2 = new DocumentBuilder()
    .setTitle('API Documentation (Swagger v2)')
    .setDescription('Generated API documentation for Swagger v2')
    .setVersion('2.0')
    .build();

  // Generate Swagger v2
  const documentV2 = SwaggerModule.createDocument(app, configV2);
  writeFileSync(
    `${docsDir}/swagger-v2.json`,
    JSON.stringify(documentV2, null, 2),
  );
  writeFileSync(`${docsDir}/swagger-v2.yaml`, yaml.dump(documentV2));

  console.log('Swagger documentation generated in `docs` directory (v2 & v3).');

  await app.close(); // Gracefully shutdown the NestJS app
  process.exit(0); // Explicitly exit the script
}

generateSwaggerDocs().catch((error) => {
  console.error('Error generating Swagger documentation:', error);
  process.exit(1); // Exit with failure code if an error occurs
});
