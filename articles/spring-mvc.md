---
layout: page
title: Spring MVC (Model View Controller)
ispage: true
intro: Spring in it's core is a dependency injection framework. However, as time goes by, spring includes many other subprojects that are targeting to solve different problems. Spring MVC is such example. Its mission is to provide powerful implementation of the Model View Controller architectural pattern. This article is about to help you get started with Spring MVC and guide you to setup your first Spring MVC application.
---



Spring in it's core, is a dependency injection framework. However, as time goes by, Spring includes many other subprojects that are targeting to solve different problems. Spring MVC is such an example. Its mission is to provide powerful implementation of the Model View Controller architectural pattern.  
This article is about to help you get started with Spring MVC and guide you to setup your first Spring MVC application.

Source can be fetched from [samples/spring-mvc][https://github.com/devsio/samples/tree/master/spring-mvc]

Pre-requirements  

* Knowledge to setup [simple Maven project](maven-helloworld)  
* Understanding of [Spring concepts](/articles/spring-concepts) and [spring-autoscan](/articles/spring-autoscan)
* Understanding of [Model View Controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 

As every other Spring application Spring-MVC needs a Spring context. Unlike the other Spring samples we've shown before, Spring-MVC sample will load its context in a different way. The difference is that Spring-MVC is not a simple Java console application, but a web application. A web application has such a feature that, instead of a Main method, it has a web application descriptor that tells the application server what to do with the deployed web application.
The idea here is that we will have to describe how the Spring context will be loaded via web.xml. This will mean that web.xml will configure appropriate Spring dispatcher and define which configuration to use during Spring initialization. Following there is a web.xml sample 

{% highlight xml %}
<web-app id="SpringMVCDemo" version="2.4"
	xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee
http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">

	<display-name>Spring MVC Demo Application</display-name>

	<servlet>
		<servlet-name>dispatcher</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>/WEB-INF/dispatcher-servlet.xml</param-value>
	</context-param>

	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>
</web-app>
{% endhighlight %}

This configuration tells the application server to dispatch every request to the Springs DispatcherServlet which on the other hand is initialized with Spring context according to the configuration at /WEB-INF/dispatcher-servlet.xml.

Now, lets take a look at the dispatcher-servlet.xml configuration

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="
 http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
 http://www.springframework.org/schema/context
 http://www.springframework.org/schema/context/spring-context-4.1.xsd
 http://www.springframework.org/schema/mvc
 http://www.springframework.org/schema/mvc/spring-mvc-3.1.xsd">

	<context:component-scan base-package="io.devs.spring.mvcdemo" />
	
	<bean
		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix">
			<value>/WEB-INF/views/</value>
		</property>
		<property name="suffix">
			<value>.jsp</value>
		</property>
	</bean>
</beans>
{% endhighlight %}

This basically means, scan for Spring components at defined base-package and create InternalResourceViewResolver. The goal of the autoscan will be to find our **controllers** and define appropriate resolver that will be able to find our view templates.

The autoscan should find our *HelloWorldController*. A Class that will take care for some of the requests, do some internal computation and figure out appropriate view for the request. Following is the source of our controller.

{% highlight java %}
package io.devs.spring.mvcdemo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HelloWorldController {

	@RequestMapping(value = "/hello")
	public String hello(
			@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {

		model.addAttribute("name", name);

		return "helloworld";

	}

}
{% endhighlight %}

Please note the **@Controller** annotation. That basically means this class will be Controller and take care about some of the requests so Spring needs to initialize it. **@RequestMapping** defines that annotated method will handle the requests sent to the mapping (in this case *"/hello"*).
**@RequestParam** maps the *name* query parameter to the name parameter of the method, so Spring will be able to provide it for us. Also the annotation defines that this parameter is not required and default value of "World" will be provided instead.  

As you can notice the method is very simple. Its duty is only to populate the model object with the name parameter so it will be accessible from the template and to return the name of the **view** that will be rendered to the user. In this case *"helloworld"* template will be searched in the predefined location.

And finally the view. It is a simple jsp page. It uses the name parameter provided from the controller and puts it at appropriate place.

{% highlight jsp %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Spring MVC -DEMO</title>
</head>
<body>
	<h1>Hello : ${name}</h1>
</body>
</html>
{%  endhighlight %}

This should be enough in order to create your first Spring-MVC application. 

Source can be fetched from [samples/spring-mvc][https://github.com/devsio/samples/tree/master/spring-mvc]
