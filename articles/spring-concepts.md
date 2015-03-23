---
layout: page
title: Spring Basic Concepts
ispage: true
intro: This article is targeted to audience that is trying to get started with Spring Framework. The goal is to explain the basic concepts that Spring is built upon and guide the user to create simple spring application. In recent years Spring became the monster it was fighting against. We will cover none of Springs complex features in this article. The only goal will be to cover Dependency Injection pattern and see it in action using spring core.
---

This article is targeted for an audience that is trying to get started with the Spring Framework. The goal is to explain the basic concepts that Spring is built upon and guide the user to create a simple Spring application.  
In recent years Spring became the monster it was fighting against. We will cover none of Springs complex features in this article. The only goal will be to cover the [TODO: Dependency Injection](todo) pattern and see it in action using spring core.

Source can be fetched from [samples/spring-core](https://github.com/devsio/samples/tree/master/spring-core)

Pre-requirements 

*Knowledge to setup [simple maven project](/articles/maven-helloworld)


This example will use Maven. You can use Simple Maven Project as a starting point. 

First, in order to use Spring we will need to include it in our pom file. 
The following dependencies should be added:

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

This will allow us to use Spring framework. 
Next step is to add spring-context.xml file under the main resources.
The spring context file is xml format. This is slightly old format that has been enhanced through the years, but we use it because it is a good starting point to explain dependency injection with Spring.


{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

	<bean id="homer" class="io.devs.spring.springcore.domain.Person">
		<property name="firstName" value="Homer" />
		<property name="lastName" value="Simpson" />
		<property name="kids">
			<list>
				<ref bean="bart" />
			</list>
		</property>
	</bean>

	<bean id="bart" class="io.devs.spring.springcore.domain.Person">
		<property name="firstName" value="Bart" />
		<property name="lastName" value="Simpson" />
	</bean>

</beans>

{% endhighlight %}

The goal of the context file is to define the spring context. You can imagine the spring context as a repository of already created objects ready to be used.
That is exactly what our spring context defines. It consists of beans xml root element, that defines two beans of type Person. Both beans can be distinguished according to their id. This means that once our spring context is created it will contain two classes of type Person. 
Lets implement our class Person in order to proceed. 


{% highlight java %}
package io.devs.spring.springcore.domain;

import java.util.List;

public class Person {

	private String firstName;
	private String lastName;
	private List<Person> kids;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<Person> getKids() {
		return kids;
	}

	public void setKids(List<Person> kids) {
		this.kids = kids;
	}

	public String toString() {
		return getFirstName() + " " + getLastName() + " " + (getKids()!=null?getKids():"");
	}
}

{% endhighlight %}

The class is a plain Java object defining several simple fields. Those fields are defined via property nodes in the spring context xml.
The firstName property will be populated with a provided value and the property kids will be populated with a list of the objects that are provided. 
In this example we can notice two approaches to assign a value to a field. First one is to directly assign value to the field and the second approach is to assign another object via reference. Such example is shown where the object with id Bart is added as an element in the list of kids for Homer.

Having said how Spring wires the beans defined in the context we need to show how can we read this spring context configuration, initialize appropriate spring context and use it.
We will initialize the spring context in the main Java method. Following is the code that does the magic:

{% highlight java %}
package io.devs.spring.springcore;

import io.devs.spring.springcore.domain.Person;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

	public static void main(String[] args) {
	      ApplicationContext context = 
	              new ClassPathXmlApplicationContext("spring-context.xml");
	      
	      Person person = (Person) context.getBean("homer");

	      System.out.println(person);
	      
	      ((AbstractApplicationContext)context).close();
	}

}
{% endhighlight %}

First important thing to notice is ClassPathXmlApplicationContext. This is a class that implements ApplicationContext interface and uses configuration provided in the classpath in order to create the context. Our spring context configuration is such configuration that is provided in the classpath. 
The next line shows how to fetch the bean out from the context. We use the context.getBean method in order to achieve this. 
So in our example we fetch the bean with id homer. The one that internally has a reference to the other bean named bart.
Please note that getBean method has several variations allowing the user to query the context for a bean according to its id, class type, etc. 
The system out should print the following line in order to confirm that everything was wired as expected.

*Homer Simpson [Bart Simpson ]*


And last but not least, housekeeping. Keep in mind that ApplicationContext should be closed in order to prevent unexpected memory leaks. 

Congratulations, you've created your first Spring application. What was important to understand was the dependency injection pattern. 
This pattern overcomes the problem of manually creating objects and setting properties. All this boilerplate code is dropped and replaced with way more readable xml configuration. Another important thing is the Spring Context. You can imagine it as a small repository of objects ready to be used. 
You have to initialize the context somehow so we introduced the ClassPathXmlApplicationContext. There are many more methods to initialize the context but this is a good one for a start.


Source can be fetched from [samples/spring-core](https://github.com/devsio/samples/tree/master/spring-core)
