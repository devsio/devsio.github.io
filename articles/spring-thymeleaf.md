---
layout: page
title: Spring MVC with Thymeleaf
ispage: true
intro: Spring MVC is one of the most popular MVC frameworks, Thymeleaf on the other hand is becoming one of the most popular templating frameworks at the moment. The goal of this article is to guide you in order to set up thymeleaf as a rendering engine for your Spring MVC web application. 
---

Spring MVC is one of the most popular MVC frameworks, Thymeleaf on the other hand is becoming one of the most popular templating frameworks at the moment. 
The goal of this article is to guide you in order to set up thymeleaf as a rendering engine for your Spring MVC web application. 

Source can be fetched from [samples/spring-mvc][https://github.com/devsio/samples/tree/master/spring-thymeleaf]

Prerequirements  

* Knowledge to setup [Simple Maven Project](maven-helloworld)  
* Understanding of [Spring concepts](/articles/spring-concepts) and [spring-autoscan](/articles/spring-autoscan)
* Understanding of [Model View Controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 
* Understanding of [Spring MVC](/articles/spring-mvc)

The structure of the project is generally the same as the one we've shown in the [Spring MVC](/articles/spring-mvc). So if want to setup Spring MVC application please take a look at that article. This article on the other hand will point out only the differences that should be made in your project in order to use Thymeleaf instead of JSP.

First of all we need to include appropriate Thymeleaf libraries:

{% highlight xml %}

<dependency>
	<groupId>org.thymeleaf</groupId>
	<artifactId>thymeleaf-spring4</artifactId>
	<version>${thymeleaf.version}</version>
</dependency>
<dependency>
	<groupId>org.thymeleaf</groupId>
	<artifactId>thymeleaf</artifactId>
	<version>${thymeleaf.version}</version>
</dependency>

{% endhighlight %}


After including thymeleaf libraries we need to switch the Resolver in the Spring configuration. 
In order to configure Thymeleaf following entries should be added to the spring config

{% highlight xml %}
<bean id="templateResolver"
	class="org.thymeleaf.templateresolver.ServletContextTemplateResolver">
	<property name="prefix" value="/WEB-INF/templates/" />
	<property name="suffix" value=".html" />
	<property name="templateMode" value="HTML5" />
</bean>

<bean id="templateEngine" class="org.thymeleaf.spring4.SpringTemplateEngine">
	<property name="templateResolver" ref="templateResolver" />
</bean>

<bean class="org.thymeleaf.spring4.view.ThymeleafViewResolver">
	<property name="templateEngine" ref="templateEngine" />
</bean>

{% endhighlight %}

This means that templates folder under WEB-INF will contain our thymeleaf templates and they will have .html suffix.

And finally, we can add some thymeleaf template to test if our configuration works.

{% highlight jsp %}
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Spring MVC + Thymeleaf Example</title>
</head>
<body>
<td>Hello, <span th:text="${name}" />!</td>
</body>
</html>
{% endhighlight %}


Our Spring MVC with Thymeleaf example is finished. If you want to find more info regarding Thymeleaf please visit their site.

Source can be fetched from [samples/spring-mvc](https://github.com/devsio/samples/tree/master/spring-thymeleaf)
