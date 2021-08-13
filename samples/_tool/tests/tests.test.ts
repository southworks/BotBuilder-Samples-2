import path from "path";
import { nanoid, customAlphabet } from "nanoid";
import pino from "pino";
import {
  BotTester,
  AppRegistration,
  BotParameterProvider,
  ConnectionStatus,
  Bot,
  DeploymentStatus,
} from "../src/BotTester";
import assert from "assert";
import parallel from "mocha.parallel";
import glob from "glob";
import _fs from "fs";

const fs = _fs.promises;

// const describe = (k, c) => c();
// const it = (k, c) => c();
const bottester = new BotTester();
const appreg = new AppRegistration();
const botParameterProvider = new BotParameterProvider();

botParameterProvider.register("app", ({ collection }) => {
  // return appreg.create({ name: collection.botId.value, secret: nanoid() });
  // return { name: "a", secret: "1" };
});

botParameterProvider.register("bot", ({ scope }) => ({
  name: `${scope.template.name}-${scope.bot.name}`,
}));

const samplesFolder = path.resolve(`${__dirname}/../..`);

const appregs = [
  {
    id: "5dfe4cba-1794-402e-a707-eb6a9dd02add",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "26a51ce2-c20d-4cbd-a5aa-e96d7a283077",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "7715fbe4-eef2-4e1e-865f-0aa5698507bd",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "c3886c63-e5cf-4dc5-8cce-9b618897939b",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "d9f6a7cf-5d2b-46fe-89eb-101aaf006604",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "c1c61589-7887-4943-8e74-72d2fd2578aa",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "7c2d9c8e-fba0-4f01-a50a-cb3f8781a900",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "f2905080-7611-44c1-8711-68338c3bc18f",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "da6172f8-2854-46c4-a02c-56ccc652a714",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "b5ee05e4-d95e-42a6-8f80-48808f6c7a20",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "09b67a16-f470-4acd-81c9-f0c1b8272a65",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "5627fc20-5051-4af8-af70-ec30513a3413",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "7a95b259-0dde-4431-b4a4-0ed80c5ee06e",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "fe3ac4d0-4d35-44a7-8c39-ba34eb393165",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "d2fdd23b-27f1-4135-8efe-1f77f8f20a52",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "a1935622-bcca-4742-967d-9c048a5b8d5c",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "97eea80e-6710-4282-8d5f-f2dc4e070d12",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "b5b6eead-28f9-466b-8c88-7053e4b7929d",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "07690179-7da8-4666-b8c5-691af608795d",
    secret: "umHVC9B_2aG_M9tNml-93xpud-U8Dp.Djy",
  },
  {
    id: "a37c4f15-2fc2-4e16-aafd-e6521238bfcc",
    secret: "maiIoTWy~nO-_A4588gM7A9DR7Bo4Q~Agr",
  },
  {
    id: "8d14de78-5fc6-4db1-9428-b4fdc079a055",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "974a67f3-8d37-42b2-8304-dc012a576d12",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "7cb2f30c-362b-453a-a497-ca2e83e6ea1a",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "628ca2a3-74d9-4606-be2c-37372f8c6d1a",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "ac2f0c66-c181-42a8-8426-7626d47a504f",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "ecb829a7-59d8-476d-9f63-cd98919800ae",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "8172c184-a2d8-4565-8222-c4897ef61475",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "475ccea9-e464-479f-b4fd-3cf1b2f4307d",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "1bc162db-db79-418d-ae45-5abb78508789",
    secret: "jvpWoiJJzGt3Fj",
  },
  {
    id: "4aec072e-5dc0-4764-95da-71cd38c0fdce",
    secret: "jvpWoiJJzGt3Fj",
  },
];

// const newRg = glob
//   .sync(`**/DeploymentTemplates/template-with-new-rg.json`, {
//     nocase: true,
//     cwd: samplesFolder,
//   })
//   .filter((e) => !e.includes("/bin/"))
//   .map((path, id) => ({ id, path }));

const newRg = [];

const preexistingRg = glob
  .sync(`**/DeploymentTemplates/template-with-preexisting-rg.json`, {
    nocase: true,
    cwd: samplesFolder,
  })
  .filter((e) => !e.includes("/bin/"))
  .filter((e) => !e.includes("/obj/"))
  .map((path, id) => ({ id, path }));

// const preexistingRg = [];

// Testear aparte 27, 28, 29, 30
// parameter => existingAppServicePlanResourceGroup: { value: "{{ bot.name }}" },

const templates = [
  {
    name: "new-rg",
    path: "/DeploymentTemplates/template-with-new-rg.json",
    parameters: {
      groupLocation: { value: "westus" },
      groupName: { value: "{{ bot.name }}" },
      botId: { value: "{{ bot.name }}" },
      botSku: { value: "F0" },
      newAppServicePlanName: { value: "{{ bot.name }}" },
      newAppServicePlanLocation: { value: "westus" },
      newAppServicePlanSku: {
        value: {
          // name: "F1",
          // tier: "Basic",
          // size: "F1",
          // family: "F",
          // capacity: 1,
          name: "S1",
          tier: "Standard",
          size: "S1",
          family: "S",
          capacity: 1,
        },
      },
      appId: { value: "{{ app.id }}" },
      appSecret: { value: "{{ app.secret }}" },
    },
    bots: newRg
      // .filter(({ id }) => [19, 37].includes(id));
      // .filter(({ id }) => [152].includes(id))
      // .filter(
      //   ({ id }) =>
      //     ![
      //       1, 3, 2, 5, 6, 4, 9, 7, 8, 14, 10, 16, 12, 26, 23, 21, 75, 79, 76,
      //       78, 84, 83, 80, 82, 81, 109, 107, 106, 108, 105, 111, 114, 110, 113,
      //       122, 146, 147, 0, 11, 13, 15, 17, 18, 22, 24, 25, 27, 28, 29, 30,
      //       // 2021-08-12
      //       19, 20, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53,
      //       54, 55, 56, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 68, 69, 70, 72,
      //       77, 85, 86, 87, 89, 90, 91, 92, 93, 94, 96, 97, 98, 100, 101, 102,
      //       103, 104, 112, 115, 117, 119, 120, 123, 126, 116, 128, 130, 131,
      //       132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 144, 145,
      //       // Requires Qna
      //       43,
      //       // Requires Luis
      //       31, 88,
      //       // Requires Slack
      //       143,
      //       // Works Locally, but no in Azure
      //       32, 33, 34, 35, 36,
      //       // mvn clean package fail
      //       44, 63, 73,
      //       // Redeploy
      //       71, 74,
      //       // Fails
      //       95, 99, 118, 124, 125, 127, 121, 129, 148, 149, 150, 151,152,153,154,155,156,157,158,159,160,161,162
      //     ].includes(id)
      // )
      // .filter(({ id }) => [37].includes(id));
      .filter((e, i) => i < appregs.length && i >= 0)
      .map((e) => {
        const folder = e.path.replace(
          /\/DeploymentTemplates\/template-with-new-rg\.json/gi,
          ""
        );
        const [main, ...rest] = folder.split("/");
        const mainFolder = main.replace(/[_]/g, "-");
        const sample = rest.join("/").split(".")?.[0].split("/").pop();
        const name = `${mainFolder}-${sample}`.slice(0, 38);

        let lang = "rest";

        if (main.startsWith("java_")) {
          lang = "java";
        }

        return {
          name: `${e.id}-${name}`,
          baseFolder: samplesFolder,
          folder,
          lang,
        };
      }),
  },
  {
    name: "pre-rg",
    path: "/DeploymentTemplates/template-with-preexisting-rg.json",
    group: { name: "pre-rg-jmut" },
    parameters: {
      botId: { value: "{{ bot.name }}" },
      botSku: { value: "F0" },
      newAppServicePlanName: { value: "{{ bot.name }}" },
      appServicePlanLocation: { value: "westus" },
      newAppServicePlanSku: {
        value: {
          name: "S1",
          tier: "Standard",
          size: "S1",
          family: "S",
          capacity: 1,
        },
      },
      appId: { value: "{{ app.id }}" },
      appSecret: { value: "{{ app.secret }}" },
    },
    bots: preexistingRg
      .filter(
        ({ id }) =>
          ![
            // 2021-08-13
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            21, 22, 23, 24, 25, 26,
            // Fails
            27, 28, 29
          ].includes(id)
      )
      .filter((e, i) => i < appregs.length && i >= 0)
      // .filter((e, i) => i < 1 && i >= 0)
      .map((e) => {
        const folder = e.path.replace(
          /\/DeploymentTemplates\/template-with-preexisting-rg\.json/gi,
          ""
        );
        const [main, ...rest] = folder.split("/");
        const mainFolder = main.replace(/[_]/g, "-");
        const sample = rest.join("/").split(".")?.[0].split("/").pop();
        const name = `${mainFolder}-${sample}`.slice(0, 38);

        return {
          name: `${e.id}-${name}`,
          baseFolder: samplesFolder,
          folder,
        };
      }),
  },
];

function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

for (const template of templates) {
  const now = new Date().toISOString().replace(/[:\.]/g, "-");
  const logsPath = path.resolve(
    path.join(__dirname, `/logs/${template.name}/${now}.log`)
  );
  const fileLogger = pino(pino.destination(logsPath));
  describe(`template: ${template.name}, path: ${template.path}, tests: ${template.bots.length}`, () => {
    const chunks = chunkArray(template.bots, appregs.length);

    for (let i = 0; i < chunks.length; i++) {
      const bots = chunks[i];

      parallel(
        `batch: ${i + 1}/${chunks.length}, tests: ${bots?.length}`,
        () => {
          const apps = [...appregs].reverse();
          for (const bot of bots) {
            const app = apps.pop();
            it(`bot: ${bot.name}, folder: ${bot.folder}`, async () => {
              const logger = fileLogger.child({
                tests: template.bots.length,
                batch: {
                  number: i + 1,
                  total: chunks.length,
                  tests: bots.length,
                },
                bot: { name: bot.name, folder: bot.folder },
              });
              const params = JSON.parse(JSON.stringify(template.parameters));
              params.appId.value = app.id;
              params.appSecret.value = app.secret;
              // await new Promise((res) => setTimeout(() => res(1), 5000));
              // assert.ok(true);
              const parameters = await botParameterProvider.process({
                parameters: params,
                scope: {
                  bot,
                  template,
                },
              });
              const options = {
                botFolder: `${bot.baseFolder}/${bot.folder}`,
                template: template.path,
                parameters,
                bot: {
                  name: parameters.botId.value as string,
                },
                group: {
                  name:
                    (parameters.botId.value as string) ||
                    (parameters.groupName.value as string),
                  exists: !!template.group?.name,
                },
              };

              const java: any = {};

              if (bot.lang == "java") {
                java.path = path.join(
                  bot.baseFolder,
                  bot.folder,
                  "/src/main/resources/application.properties"
                );
                java.content = await fs.readFile(java.path, "utf8");

                const content = java.content
                  .replace(/MicrosoftAppId=.*/gm, `MicrosoftAppId=${app.id}`)
                  .replace(
                    /MicrosoftAppPassword=.*/gm,
                    `MicrosoftAppPassword=${app.secret}`
                  );

                await fs.writeFile(java.path, content);
              }

              try {
                // await bottester.cleanup({
                //   group: { name: parameters.botId.value as string },
                // });

                if (!!template.group?.name) {
                  logger.info({
                    step: "Create Resource Group",
                    name: parameters.botId.value,
                  });
                  await bottester.createResourceGroup(
                    parameters.botId.value as string
                  );
                }

                // await new Promise((res) => setTimeout(() => res(1), 1000));
                logger.info({ step: "Deploy" });
                const { bot, ...deployment } = await bottester.deploy(options);
                // const bot = new Bot({ name: options.bot.name, group: options.group.name });
                logger.info({ step: "Bot Health-Check" });
                await bot.connect();
                const status = await bot.status();
                await bot.disconnect();

                assert.strictEqual(
                  deployment.status,
                  DeploymentStatus.Succeeded
                );
                assert.ok(status);

                logger.info({
                  step: "Assert",
                  key: "deployment",
                  actual: deployment.status,
                  expected: DeploymentStatus.Succeeded,
                });
                logger.info({
                  step: "Assert",
                  key: "conversation-status",
                  actual: status,
                  expected: true,
                });
              } catch (error) {
                const { message, stack, ...rest } = error;
                if (typeof error === "string") {
                  logger.error({ step: "Error", error });
                } else {
                  logger.error({
                    step: "Error",
                    error: { message, stack, rest },
                  });
                }
                throw error;
              } finally {
                logger.info({ step: "CleanUp" });
                if (bot.lang == "java") {
                  await fs.writeFile(java.path, java.content);
                }
                try {
                  // await bottester.cleanup({
                  //   group: {
                  //     name: options.group.name,
                  //   },
                  //   bot: { name: options.bot.name },
                  // });
                  // await appreg.remove(parameters.appId.value as string);
                } catch (error) {
                  const { message, stack, ...rest } = error;
                  if (typeof error === "string") {
                    logger.error({ step: "CleanUp-Fail", error });
                  } else {
                    logger.error({
                      step: "CleanUp-Fail",
                      error: { message, stack, rest },
                    });
                  }
                  throw error;
                }
              }
            });
          }
        }
      );
    }
  });
}
