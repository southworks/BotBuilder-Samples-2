// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.bot.sample.scaleout;

import com.microsoft.bot.builder.Bot;
import com.microsoft.bot.integration.CloudAdapterWithErrorHandler;
import com.microsoft.bot.integration.CloudAdapter;
import com.microsoft.bot.integration.Configuration;
import com.microsoft.bot.integration.spring.BotCloudAdapterController;
import com.microsoft.bot.integration.spring.BotDependencyConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

/**
 * This is the starting point of the Sprint Boot Bot application.
 */
@SpringBootApplication

// Use the default BotCloudAdapterController to receive incoming Channel messages. A custom
// controller could be used by eliminating this import and creating a new
// org.springframework.web.bind.annotation.RestController.
// The default controller is created by the Spring Boot container using
// dependency injection. The default route is /api/messages.
@Import({BotCloudAdapterController.class})

/**
 * This class extends the BotDependencyConfiguration which provides the default
 * implementations for a Bot application.  The Application class should
 * override methods in order to provide custom implementations.
 */
public class Application extends BotDependencyConfiguration {

    /**
     * The start method.
     *
     * @param args The args.
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * Returns the Bot for this application.
     *
     * <p>
     * The @Component annotation could be used on the Bot class instead of this method with the
     * @Bean annotation.
     * </p>
     *
     * @return The Bot implementation for this application.
     */
    @Bean
    public Bot getBot() {
        // If using Blob Storage. Fill these connection details in from configuration.
        // String accountName = "<ACCOUNT-NAME>";
        // String accountKey = "<ACCOUNT-KEY>";
        // String container = "dialogs";
        // Store store = new BlobStore(accountName, accountKey, container);

        // Create the storage we'll be using for the Dialog state. (Memory is great for testing purposes.)
        Store store = new MemoryStore();
        // The Dialog that will be run by the bot.
        RootDialog rootDialog = new RootDialog();
        // Create the bot as a transient.
        return new ScaleoutBot<>(store, rootDialog);
    }

    /**
     * Returns a custom Adapter that provides error handling.
     *
     * @param configuration The Configuration object to use.
     * @return An error handling CloudAdapter.
     */
    @Override
    public CloudAdapter getCloudAdapter(Configuration configuration) {
        return new CloudAdapterWithErrorHandler(configuration);
    }
}
