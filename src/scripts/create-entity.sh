#colors
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'

modules="../modules"
scripts=$PWD

# Obtain entity name
entityName=$1
entityNameMayus=${1^}

echo -e "${YELLOW}Loading entity: ${GREEN}$entityName"

cd $modules

mkdir $entityName
cp -a "./course/." "./${entityName}/"

#copy and rename module
cd $entityName
cp -a "course.module.ts" "${entityName}.module.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.module.ts"
sed -i "s/course/${entityName}/g" "${entityName}.module.ts"
rm course.module.ts

#copy and rename interface
cd "./interfaces" 
cp -a "course.interface.ts" "${entityName}.interface.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.interface.ts"
sed -i "s/course/${entityName}/g" "${entityName}.interface.ts"
rm course.interface.ts



#copy and rename dto
cd "../dto" 
cp -a "course.dto.ts" "${entityName}.dto.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.dto.ts"
sed -i "s/course/${entityName}/g" "${entityName}.dto.ts"
rm course.dto.ts



#copy and rename controllers
cd "../controllers"
cp -a "course.controller.ts" "${entityName}.controller.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.controller.ts"
sed -i "s/course/${entityName}/g" "${entityName}.controller.ts"
cp -a "course.controller.spec.ts" "${entityName}.controller.spec.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.controller.spec.ts"
sed -i "s/course/${entityName}/g" "${entityName}.controller.spec.ts"
rm course.controller.ts
rm course.controller.spec.ts

#copy and rename providers
cd "../providers"
cp -a "course.service.ts" "${entityName}.service.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.service.ts"
sed -i "s/course/${entityName}/g" "${entityName}.service.ts"
cp -a "course.service.spec.ts" "${entityName}.service.spec.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.service.spec.ts"
sed -i "s/course/${entityName}/g" "${entityName}.service.spec.ts"
rm course.service.ts
rm course.service.spec.ts

#copy and rename schemas
cd "../schemas"
cp -a "course.model.ts" "${entityName}.model.ts"
sed -i "s/Course/${entityNameMayus}/g" "${entityName}.model.ts"
sed -i "s/course/${entityName}/g" "${entityName}.model.ts"
rm course.model.ts

cd $scripts
cd "../"
import { CourseController } from './modules/course/controllers/course.controller';

sed -i "s+//newserviceimport+import { ${entityNameMayus}Service } from './modules/${entityName}/providers/${entityName}.service'+g" config.ts
sed -i "s+//newcontrollerimport+import { ${entityNameMayus}Controller } from './modules/${entityName}/controllers/${entityName}.controller'\n//newserviceimport\n//newcontrollerimport+g" config.ts
sed -i "s+//newService+${entityName}: [AppService, ${entityNameMayus}Service, ${entityNameMayus}Service],\n\t\t//newService+g" config.ts
sed -i "s+//newController+${entityName}:[${entityNameMayus}Controller],\n\t\t//newController+g" config.ts

echo -e "${YELLOW}Finished Script"
