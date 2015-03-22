---
layout: page
title: Spring Component Scan
ispage: true
---

Spring approach to define beans via [configuration](TODO: link to basic concepts) is nice approach to skip code boilerplate and configure the beans implicitly.
However spring configuration can be an overhead by itself. In this example we will analyze some use cases where single bean needs to be created of an instance and bean dependencies can be wired implicitly without spring configuration. 

Source can be fetched from [samples/spring-autoscan](https://github.com/devsio/samples/tree/master/spring-autoscan)

Prerequirements  

* Knowledge to setup [simple maven project](maven-helloworld)  
* Simple understanding of [spring concepts](spring-concepts)  


This example will use Maven. You can use Simple Maven Project as a starting point. 

First, in order to use Spring we will need to include it in our pom file. 
Following dependencies should be added:

{% highlight xml %}
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring.version}</version>
		</dependency>
{% endhighlight %}

This will allow us to use spring framework. 
Next step is to add **spring-context.xml** file under the main resources. Unlike [Spring simple project](/articles/spring-concepts) this spring context is way simpler.

{% highlight xml %}

<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
    http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context-4.1.xsd">

    <context:component-scan base-package="io.devs.spring.spring_autoscan" />

</beans>

{% endhighlight %}

This xml file also defines the spring context but with only one line. The idea is to allow the spring to scan our packages for potential beans. 
In the sample via **component-scan** we tell spring which package containes our beans and should be scanned.
Spring will scan povided package and will search for properly annotated classes. 
**@Component** is the annotation that tells spring to instantiate an object out of that class. **@Component** annotation has several specializations (**@Service, @Repository, @Controller**) that can be considered as syntactic sugar at this point and think of them as they are annotated with **@Component**.

Following is sample **@Component** that will be instantiated via autoscan and be named *'componentX'*:

{% highlight java %}
package io.devs.spring.spring_autoscan.components;

import org.springframework.stereotype.Repository;

@Component
public class ComponentX {
	
	public String toString(){
		return "Component X";
	}
}

{% endhighlight %}

Moreover we can also autowire dependencies between our instances. Actually whole point of using spring is about the dependency injection. 
Following is another class that demonstrates how to inject our ComponentX into another instance:

{% highlight java %}
package io.devs.spring.spring_autoscan.services;

import io.devs.spring.spring_autoscan.components.ComponentX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ServiceX {

	@Autowired
	private ComponentX componentX;

	@Value(":)")
	private String value;

	public String execute() {
		return "Loaded component: " + componentX + "    And value = " + value;
	}

}
{% endhighlight %}

As you may have noticed, we've annotated the componentX field with **@Autowired**. 
This means our *componentX* instance will be injected into this field and be available inside *ServiceX* instance.

Another way to inject values is **@Value** annotation. It shows nothing more than simple inline assignment in this sample, but it can be very powerful when linked with some properties. 

Similar to the spring concepts example, we create context out of xml file provided in the classpath so we use largely same Main method.

{% highlight java %}
package io.devs.spring.spring_autoscan;

import io.devs.spring.spring_autoscan.services.ServiceX;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

	// Demonstrates loading service by its Class name
	public static void main(String[] args) {
	      ApplicationContext context = 
	              new ClassPathXmlApplicationContext("spring-context.xml");
	      
	      ServiceX service = (ServiceX) context.getBean("serviceX");

	      System.out.println(service.execute());
	      
	      ((AbstractApplicationContext)context).close();
	}

}
{% endhighlight %}

As for now, we won't digg into details at this point. The idea of this article was to present the power of autoscan and not resolution details. This will be material for another article. 

Source can be fetched from [samples/spring-autoscan](https://github.com/devsio/samples/tree/master/spring-autoscan)
